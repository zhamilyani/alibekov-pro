import qrcode, qrcode.image.svg
from qrcode.constants import ERROR_CORRECT_Q

URL = "https://alibekov.pro/card.html"
DARK = "#1a1714"
LIGHT = "#fbf3e9"

qr = qrcode.QRCode(version=None, error_correction=ERROR_CORRECT_Q, box_size=40, border=4)
qr.add_data(URL); qr.make(fit=True)
print("version:", qr.version, "modules:", qr.modules_count)

img = qr.make_image(fill_color=DARK, back_color=LIGHT).convert("RGB")
img.save("qr-card.png")
print("png:", img.size)

qr2 = qrcode.QRCode(version=qr.version, error_correction=ERROR_CORRECT_Q, box_size=10, border=4,
                    image_factory=qrcode.image.svg.SvgPathImage)
qr2.add_data(URL); qr2.make(fit=True)
qr2.make_image().save("qr-card.svg")
print("svg saved")
