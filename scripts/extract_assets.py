import os
from PIL import Image

uploaded_dir = r"C:\Users\DELL\.gemini\antigravity\brain\00074c67-98a4-45d9-855d-43678913314e\.user_uploaded"
output_dir = r"C:\Users\DELL\.gemini\antigravity\scratch\luxury-ecommerce\public\assets"
os.makedirs(output_dir, exist_ok=True)

images = [
    "media_1791909765409_ae44b9a7.png", # 0: Hero
    "media_1791909793017_6c6d234d.png", # 1: Featured Collections
    "media_1791909807479_415b258b.png", # 2: Best Selling Innovations
    "media_1791909824791_6c741f79.png", # 3: Our Innovation Story
    "media_1791909835225_29bfeaf9.png", # 4: Fifth Section
    "media_1791909857684_9fc0fba9.png", # 5: Reviews
    "media_1791909870891_2ab9eac0.png", # 6: Limited Offer
    "media_1791909880353_d49f4891.png", # 7: Stay Ahead
    "media_1791909893658_3f3849ac.png", # 8: Footer
]

def load_img(idx):
    return Image.open(os.path.join(uploaded_dir, images[idx]))

# Also save full section screenshots for crystal clear reference / backdrop blend if desired
for idx, name in enumerate(images):
    im = load_img(idx)
    im.save(os.path.join(output_dir, f"section_{idx+1}_full.png"))

print("Saved section full images.")

# 1. Hero right composition (floating items showcase)
im0 = load_img(0)
# W=1024, H=558
# Hero composition is on the right half (approx x: 480 to 980, y: 80 to 520)
hero_comp = im0.crop((460, 70, 960, 520))
hero_comp.save(os.path.join(output_dir, "hero_composition.png"))

# 2. Section 2: 5 Featured Collection cards
im1 = load_img(1)
# Total width 1024. 5 cards centered horizontally.
# Card bounding boxes: approx y from 160 to 470
# Let's crop the 5 cards or product tops
card_w = 170
gap = 14
start_x = 65
for i, name in enumerate(["featured_sneaker", "featured_chronograph", "featured_gadgets", "featured_streetwear", "featured_audio"]):
    x1 = int(start_x + i * 180)
    x2 = int(x1 + 165)
    card = im1.crop((x1, 160, x2, 470))
    card.save(os.path.join(output_dir, f"{name}_card.png"))
    # Also crop product showcase image alone
    prod = im1.crop((x1 + 5, 165, x2 - 5, 330))
    prod.save(os.path.join(output_dir, f"{name}_item.png"))

print("Saved featured collections.")

# 3. Section 3: Best Selling Innovations 5 cards
im2 = load_img(2)
# 5 cards similar layout
start_x = 65
for i, name in enumerate(["prod_slimbook", "prod_drone", "prod_keyboard", "prod_glasses_camera", "prod_speaker"]):
    x1 = int(start_x + i * 180)
    x2 = int(x1 + 165)
    card = im2.crop((x1, 150, x2, 500))
    card.save(os.path.join(output_dir, f"{name}_card.png"))
    prod = im2.crop((x1 + 5, 155, x2 - 5, 335))
    prod.save(os.path.join(output_dir, f"{name}_item.png"))

print("Saved best selling products.")

# 4. Section 4: Story
im3 = load_img(3)
# Left portrait box: approx x 60 to 500, y 110 to 510
story_visual = im3.crop((0, 90, 520, 530))
story_visual.save(os.path.join(output_dir, "story_visual.png"))
story_portrait = im3.crop((70, 110, 500, 500))
story_portrait.save(os.path.join(output_dir, "story_portrait.png"))

print("Saved story visual.")

# 5. Section 5: 5 Core Value cards
im4 = load_img(4)
start_x = 65
for i, name in enumerate(["val_global_express", "val_elite_craft", "val_fortified_pay", "val_smooth_returns", "val_eternal_assist"]):
    x1 = int(start_x + i * 180)
    x2 = int(x1 + 165)
    card = im4.crop((x1, 230, x2, 500))
    card.save(os.path.join(output_dir, f"{name}_card.png"))
    icon_art = im4.crop((x1 + 5, 235, x2 - 5, 385))
    icon_art.save(os.path.join(output_dir, f"{name}_art.png"))

print("Saved value proposition cards.")

# 6. Section 6: Reviews
im5 = load_img(5)
# 3 main visible reviewer cards:
# Left arrow at ~45, right arrow at ~940
# 3 cards: Julian Thorne (~110 to 360), Anya Volkov (~380 to 640), Kenji Tanaka (~660 to 910)
rev1 = im5.crop((112, 185, 362, 500))
rev1.save(os.path.join(output_dir, "review_julian.png"))
rev2 = im5.crop((380, 185, 642, 500))
rev2.save(os.path.join(output_dir, "review_anya.png"))
rev3 = im5.crop((662, 185, 912, 500))
rev3.save(os.path.join(output_dir, "review_kenji.png"))

# Also crop avatar circles
av1 = im5.crop((175, 205, 295, 325))
av1.save(os.path.join(output_dir, "avatar_julian.png"))
av2 = im5.crop((455, 205, 575, 325))
av2.save(os.path.join(output_dir, "avatar_anya.png"))
av3 = im5.crop((730, 205, 850, 325))
av3.save(os.path.join(output_dir, "avatar_kenji.png"))

print("Saved review cards and avatars.")

# 7. Section 7: Limited-Time Offer
im6 = load_img(6)
# Left is text + countdown (0 to 450), Right is 3D visual (480 to 980)
offer_art = im6.crop((480, 100, 960, 480))
offer_art.save(os.path.join(output_dir, "offer_product_visual.png"))

print("Saved offer product visual.")

# 8. Section 8: Stay Ahead
im7 = load_img(7)
# Center glass input bar, floating headphone and icosahedrons
subscribe_art = im7.crop((180, 230, 840, 440))
subscribe_art.save(os.path.join(output_dir, "newsletter_center_card.png"))

# 9. Section 9: Footer
im8 = load_img(8)
# Payment method dock
payment_dock = im8.crop((130, 715, 890, 825))
payment_dock.save(os.path.join(output_dir, "payment_dock.png"))

print("Asset extraction script completed.")
