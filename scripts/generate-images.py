#!/usr/bin/env python3
"""Generate OG image and favicons for PickPlay website using PIL."""

import math
from PIL import Image, ImageDraw, ImageFont

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

# Colors
INDIGO = (99, 102, 241)
PINK = (236, 72, 153)
ORANGE = (249, 115, 22)
WHITE = (255, 255, 255)
WHITE_ALPHA = (255, 255, 255, 180)


def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def make_gradient(width, height):
    """Create a horizontal gradient: indigo -> pink -> orange."""
    img = Image.new("RGB", (width, height))
    pixels = img.load()
    for x in range(width):
        t = x / (width - 1)
        if t < 0.5:
            color = lerp_color(INDIGO, PINK, t * 2)
        else:
            color = lerp_color(PINK, ORANGE, (t - 0.5) * 2)
        for y in range(height):
            pixels[x, y] = color
    return img


def draw_rounded_rect(draw, xy, radius, fill):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill)


def generate_og_image(output_path):
    W, H = 1200, 630
    img = make_gradient(W, H)
    draw = ImageDraw.Draw(img, "RGBA")

    # Subtle noise/pattern overlay - soft white circles in background
    for i, (cx, cy, r, alpha) in enumerate([
        (150, 100, 200, 25),
        (1050, 530, 180, 20),
        (600, 550, 150, 15),
        (200, 500, 120, 20),
        (1000, 100, 160, 18),
    ]):
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(255, 255, 255, alpha))
        img = Image.alpha_composite(img.convert("RGBA"), overlay)

    draw = ImageDraw.Draw(img, "RGBA")

    # === Category pills ===
    pills = [
        ("생활도구", (14, 165, 233)),   # sky blue
        ("파티게임", (139, 92, 246)),   # violet
        ("테스트", (245, 158, 11)),     # amber
    ]
    pill_font = ImageFont.truetype(FONT_BOLD, 22)
    pill_y = 160
    pill_spacing = 30
    # Calculate total width
    pill_widths = []
    for label, color in pills:
        bb = pill_font.getbbox(label)
        tw = bb[2] - bb[0]
        pill_widths.append(tw + 48)
    total_pill_w = sum(pill_widths) + pill_spacing * (len(pills) - 1)
    pill_x = (W - total_pill_w) // 2

    for i, ((label, color), pw) in enumerate(zip(pills, pill_widths)):
        px0 = pill_x
        px1 = pill_x + pw
        py0 = pill_y
        py1 = pill_y + 40
        bg_color = color + (60,)  # semi-transparent
        draw.rounded_rectangle([px0, py0, px1, py1], radius=20, fill=(255, 255, 255, 50))
        # Colored dot
        dot_cx = px0 + 20
        dot_cy = (py0 + py1) // 2
        draw.ellipse([dot_cx - 6, dot_cy - 6, dot_cx + 6, dot_cy + 6], fill=color + (255,))
        # Text
        bb = pill_font.getbbox(label)
        tw = bb[2] - bb[0]
        th = bb[3] - bb[1]
        tx = px0 + 34
        ty = py0 + (40 - th) // 2 - bb[1]
        draw.text((tx, ty), label, font=pill_font, fill=(255, 255, 255, 230))
        pill_x += pw + pill_spacing

    # === Main title: PickPlay ===
    title_font = ImageFont.truetype(FONT_BOLD, 110)
    title = "PickPlay"
    bb = title_font.getbbox(title)
    tw = bb[2] - bb[0]
    th = bb[3] - bb[1]
    tx = (W - tw) // 2 - bb[0]
    ty = 240
    # Shadow
    draw.text((tx + 3, ty + 3), title, font=title_font, fill=(0, 0, 0, 60))
    draw.text((tx, ty), title, font=title_font, fill=(255, 255, 255, 255))

    # === Subtitle ===
    sub_font = ImageFont.truetype(FONT_REGULAR, 36)
    subtitle = "선택과 재미를 한 번에"
    bb = sub_font.getbbox(subtitle)
    tw = bb[2] - bb[0]
    sx = (W - tw) // 2 - bb[0]
    sy = ty + th + 20
    draw.text((sx, sy), subtitle, font=sub_font, fill=(255, 255, 255, 210))

    # === Bottom URL ===
    url_font = ImageFont.truetype(FONT_REGULAR, 26)
    url = "pick-play.github.io"
    bb = url_font.getbbox(url)
    tw = bb[2] - bb[0]
    ux = (W - tw) // 2 - bb[0]
    uy = H - 70
    draw.text((ux, uy), url, font=url_font, fill=(255, 255, 255, 170))

    img = img.convert("RGB")
    img.save(output_path, "PNG", optimize=True)
    print(f"OG image saved: {output_path} ({W}x{H})")


def generate_favicon(output_path, size):
    """Generate a favicon with rounded square gradient and white 'P'."""
    # Work at 4x for antialiasing, then downscale
    scale = 4
    S = size * scale

    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))

    # Draw rounded square gradient background
    bg = make_gradient(S, S)
    bg = bg.convert("RGBA")

    # Create rounded mask
    mask = Image.new("L", (S, S), 0)
    mask_draw = ImageDraw.Draw(mask)
    radius = int(S * 0.2)  # 20% corner radius
    mask_draw.rounded_rectangle([0, 0, S - 1, S - 1], radius=radius, fill=255)

    # Apply mask to background
    bg.putalpha(mask)
    img = Image.alpha_composite(img, bg)

    # Draw white "P"
    draw = ImageDraw.Draw(img)
    font_size = int(S * 0.62)
    try:
        font = ImageFont.truetype(FONT_BOLD, font_size)
    except Exception:
        font = ImageFont.load_default()

    letter = "P"
    bb = font.getbbox(letter)
    tw = bb[2] - bb[0]
    th = bb[3] - bb[1]
    lx = (S - tw) // 2 - bb[0]
    ly = (S - th) // 2 - bb[1]
    # Shadow
    draw.text((lx + scale, ly + scale), letter, font=font, fill=(0, 0, 0, 80))
    draw.text((lx, ly), letter, font=font, fill=(255, 255, 255, 255))

    # Downscale with LANCZOS for crisp result
    img = img.resize((size, size), Image.LANCZOS)

    # Threshold near-transparent pixels to fully transparent (clean edges)
    r, g, b, a = img.split()
    import numpy as np
    a_arr = np.array(a)
    a_arr[a_arr < 10] = 0
    a = Image.fromarray(a_arr)
    img = Image.merge("RGBA", (r, g, b, a))

    img.save(output_path, "PNG", optimize=True)
    print(f"Favicon saved: {output_path} ({size}x{size})")


if __name__ == "__main__":
    base = "/mnt/c/Users/yong/OneDrive/yong/15. 취미/ad_homepage/public"

    generate_og_image(f"{base}/og-image.png")
    generate_favicon(f"{base}/favicon-32x32.png", 32)
    generate_favicon(f"{base}/favicon-16x16.png", 16)

    # Also regenerate the main favicon.png at a larger size for quality
    generate_favicon(f"{base}/favicon.png", 64)

    print("Done.")
