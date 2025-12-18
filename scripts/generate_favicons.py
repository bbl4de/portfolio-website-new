#!/usr/bin/env python3
"""
Generate favicon assets for the site without external dependencies.

The icon is a stylized monogram that stays legible at small sizes and
is emitted as PNG variants plus a combined ICO file.
"""

from __future__ import annotations

import math
import struct
import zlib
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
PUBLIC_DIR = ROOT_DIR / "public"


def lerp(a: float, b: float, t: float) -> float:
  """Linear interpolation."""
  return a + (b - a) * t


def clamp(value: float, low: float = 0.0, high: float = 255.0) -> int:
  """Clamp and cast to an integer channel value."""
  return int(max(low, min(high, value)))


def b_shape(u: float, v: float) -> bool:
  """Signed mask for a rounded 'B' shape in UV space."""
  outer_bar = 0.26 <= u <= 0.46 and 0.18 <= v <= 0.82
  top_bowl = ((u - 0.58) / 0.24) ** 2 + ((v - 0.34) / 0.22) ** 2 <= 1.0
  bottom_bowl = ((u - 0.58) / 0.24) ** 2 + ((v - 0.68) / 0.22) ** 2 <= 1.0

  inner_bar = 0.36 <= u <= 0.48 and 0.26 <= v <= 0.74
  top_hole = ((u - 0.60) / 0.16) ** 2 + ((v - 0.34) / 0.14) ** 2 <= 1.0
  bottom_hole = ((u - 0.60) / 0.16) ** 2 + ((v - 0.68) / 0.14) ** 2 <= 1.0

  return (outer_bar or top_bowl or bottom_bowl) and not (
    inner_bar or top_hole or bottom_hole
  )


def pixel_color(size: int, x: int, y: int) -> tuple[int, int, int]:
  """Compute a single pixel with gentle background gradient and accent."""
  t = (x + y) / (2.0 * max(1, size - 1))
  base = (
    lerp(14, 32, t),
    lerp(12, 24, t),
    lerp(26, 74, t),
  )

  dx = (x - size * 0.2) / size
  dy = (y - size * 0.2) / size
  radial = max(0.0, 1.0 - math.hypot(dx, dy) * 1.6)
  base = tuple(clamp(channel + radial * 10.0) for channel in base)

  offsets = ((0.25, 0.25), (0.75, 0.25), (0.25, 0.75), (0.75, 0.75))
  coverage = (
    sum(b_shape((x + ox) / size, (y + oy) / size) for ox, oy in offsets)
    / len(offsets)
  )

  if coverage == 0:
    return tuple(clamp(c) for c in base)

  accent_low = (100, 72, 190)
  accent_high = (186, 142, 255)
  sheen = 0.22 + 0.45 * (1.0 - y / max(1, size - 1))
  accent = tuple(lerp(lo, hi, sheen) for lo, hi in zip(accent_low, accent_high))

  mix = 0.1 + coverage * 0.9
  return tuple(clamp(base[i] * (1.0 - mix) + accent[i] * mix) for i in range(3))


def render_icon(size: int) -> list[list[int]]:
  rows: list[list[int]] = []
  for y in range(size):
    row: list[int] = []
    for x in range(size):
      row.extend(pixel_color(size, x, y))
    rows.append(row)
  return rows


def write_png(path: Path, rows: list[list[int]]) -> None:
  size = len(rows)
  raw = b"".join(b"\x00" + bytes(row) for row in rows)

  ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)

  def chunk(tag: bytes, data: bytes) -> bytes:
    return (
      struct.pack(">I", len(data))
      + tag
      + data
      + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    )

  png = (
    b"\x89PNG\r\n\x1a\n"
    + chunk(b"IHDR", ihdr)
    + chunk(b"IDAT", zlib.compress(raw, level=9))
    + chunk(b"IEND", b"")
  )
  path.write_bytes(png)


def write_ico(path: Path, images: list[tuple[int, Path]]) -> None:
  header = struct.pack("<HHH", 0, 1, len(images))
  offset = 6 + 16 * len(images)
  entries: list[tuple[bytes, bytes]] = []

  for size, png_path in images:
    data = png_path.read_bytes()
    width_byte = size if size < 256 else 0
    entry = struct.pack("<BBBBHHII", width_byte, width_byte, 0, 0, 0, 0, len(data), offset)
    entries.append((entry, data))
    offset += len(data)

  with path.open("wb") as f:
    f.write(header)
    for entry, _ in entries:
      f.write(entry)
    for _, data in entries:
      f.write(data)


def main() -> None:
  PUBLIC_DIR.mkdir(exist_ok=True)
  targets: dict[str, int] = {
    "favicon-512.png": 512,
    "favicon-192.png": 192,
    "apple-touch-icon.png": 180,
    "favicon-64.png": 64,
    "favicon-32x32.png": 32,
    "favicon-16x16.png": 16,
  }

  generated: dict[int, Path] = {}
  for name, size in targets.items():
    path = PUBLIC_DIR / name
    write_png(path, render_icon(size))
    generated[size] = path

  ico_order = [64, 32, 16]
  write_ico(PUBLIC_DIR / "favicon.ico", [(size, generated[size]) for size in ico_order])


if __name__ == "__main__":
  main()
