import os
import time
import requests
from bs4 import BeautifulSoup
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# ==========================================
# CONFIGURATION (ตั้งค่าการใช้งาน)
# ==========================================

# 1. LINE Notify Token (รับโทเค็นจาก: https://notify-bot.line.me/)
LINE_NOTIFY_TOKEN = "YOUR_LINE_NOTIFY_TOKEN"

# 2. Google Sheets Configuration
# ต้องดาวน์โหลดไฟล์ credentials.json จาก Google Cloud Console มาไว้ในโฟลเดอร์เดียวกัน
GOOGLE_SHEET_KEY = "YOUR_GOOGLE_SHEET_ID"  # ดูไอดีจาก URL ของ Google Sheet
SHEET_NAME = "Sheet1"

# 3. URL ของสินค้าคู่แข่งที่ต้องการสแกน
TARGET_URL = "http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html" # เว็บสาธิตการดึงข้อมูล

# ==========================================
# 1. WEB SCRAPING FUNCTION
# ==========================================
def scrape_product_price(url):
    """
    ฟังก์ชันสำหรับดึงข้อมูลราคาสินค้าและชื่อสินค้าจากหน้าเว็บเป้าหมาย
    """
    print(f"กำลังดึงข้อมูลจาก: {url} ...")
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # ค้นหาชื่อสินค้า (ตัวอย่างสำหรับเว็บ books.toscrape.com)
        title_element = soup.find("h1")
        product_name = title_element.text.strip() if title_element else "ไม่พบชื่อสินค้า"
        
        # ค้นหาราคาสินค้า (ตัวอย่างสำหรับเว็บ books.toscrape.com)
        price_element = soup.find("p", class_="price_color")
        if price_element:
            # แปลงราคาเช่น "£51.77" ให้กลายเป็นตัวเลข float
            price_text = price_element.text.strip()
            price_val = float(price_text.replace("£", "").replace("$", "").replace("฿", ""))
        else:
            product_name, price_val = "ไม่พบราคาสินค้า", 0.0
            
        print(f"พบสินค้า: {product_name} | ราคาปัจจุบัน: {price_val}")
        return product_name, price_val
        
    except Exception as e:
        print(f"เกิดข้อผิดพลาดในการดึงข้อมูล: {e}")
        return None, None

# ==========================================
# 2. GOOGLE SHEETS FUNCTION
# ==========================================
def update_google_sheet(product_name, current_price):
    """
    เชื่อมต่อและอัปเดตข้อมูลราคาสินค้าใน Google Sheets
    """
    print("กำลังเชื่อมต่อ Google Sheets...")
    # ตั้งสิทธิ์การเข้าถึง API ของ Google Sheet และ Drive
    scope = ["https://spreadsheets.google.com/feeds", 'https://www.googleapis.com/auth/drive']
    
    try:
        # ตรวจสอบไฟล์ Credentials
        credentials_file = "credentials.json"
        if not os.path.exists(credentials_file):
            print(f"⚠️ คำเตือน: ไม่พบไฟล์ '{credentials_file}' ในโฟลเดอร์นี้ กรุณาตั้งค่าตามคู่มือ")
            return None
            
        creds = ServiceAccountCredentials.from_json_keyfile_name(credentials_file, scope)
        client = gspread.authorize(creds)
        
        # เปิด Google Sheet ด้วย ID
        sheet = client.open_by_key(GOOGLE_SHEET_KEY).worksheet(SHEET_NAME)
        
        # ค้นหาว่าในแผ่นงานมีสินค้าตัวนี้บันทึกไว้แล้วหรือยัง
        cell = sheet.find(product_name)
        
        if cell:
            # ถ้ามีอยู่แล้ว ให้ดึงราคาเก่ามาเช็คก่อน
            row = cell.row
            old_price_text = sheet.cell(row, 2).value  # คอลัมน์ที่ 2 คือราคา
            old_price = float(old_price_text) if old_price_text else 0.0
            
            # อัปเดตราคาใหม่
            sheet.update_cell(row, 2, current_price)
            sheet.update_cell(row, 3, time.strftime("%Y-%m-%d %H:%M:%S"))
            print(f"อัปเดตข้อมูลเรียบร้อย (ราคาเก่า: {old_price} -> ราคาใหม่: {current_price})")
            return old_price
        else:
            # ถ้ายังไม่มีสินค้านี้ในตาราง ให้เพิ่มแถวใหม่
            sheet.append_row([product_name, current_price, time.strftime("%Y-%m-%d %H:%M:%S")])
            print(f"เพิ่มรายการสินค้าใหม่เรียบร้อย: {product_name}")
            return current_price
            
    except Exception as e:
        print(f"เกิดข้อผิดพลาดกับ Google Sheets: {e}")
        return None

# ==========================================
# 3. LINE NOTIFY FUNCTION
# ==========================================
def send_line_notification(token, message):
    """
    ส่งข้อความแจ้งเตือนเข้า LINE ผ่าน API ของ LINE Notify
    """
    url = "https://notify-api.line.me/api/notify"
    headers = {
        "Authorization": f"Bearer {token}"
    }
    data = {
        "message": message
    }
    
    try:
        response = requests.post(url, headers=headers, data=data)
        if response.status_code == 200:
            print("ส่งการแจ้งเตือนเข้า LINE เรียบร้อยแล้ว! 🚀")
        else:
            print(f"ส่ง LINE ไม่สำเร็จ สถานะ: {response.status_code} | {response.text}")
    except Exception as e:
        print(f"เกิดข้อผิดพลาดในการส่ง LINE: {e}")

# ==========================================
# MAIN WORKFLOW
# ==========================================
def main():
    print("=== เริ่มต้นระบบตรวจสอบราคาสินค้าคู่แข่ง ===")
    
    # 1. ดึงข้อมูลเว็บเป้าหมาย
    product_name, current_price = scrape_product_price(TARGET_URL)
    
    if product_name and current_price:
        # 2. บันทึกและตรวจเช็คราคาใน Google Sheet
        old_price = update_google_sheet(product_name, current_price)
        
        # 3. ตรวจสอบการลดลงของราคา และส่งแจ้งเตือนเข้า LINE
        if old_price is not None:
            if current_price < old_price:
                # ราคาสินค้าลดลง! แจ้งเตือนด่วน
                discount = old_price - current_price
                msg = (
                    f"\n🚨 [แจ้งเตือนราคาลดลง!]\n"
                    f"📦 สินค้า: {product_name}\n"
                    f"📉 ราคาเดิม: ฿{old_price:.2f}\n"
                    f"🔥 ราคาใหม่: ฿{current_price:.2f}\n"
                    f"💸 ประหยัดไปได้: ฿{discount:.2f}\n"
                    f"🌐 ลิงก์: {TARGET_URL}"
                )
                send_line_notification(LINE_NOTIFY_TOKEN, msg)
            elif current_price > old_price:
                # ราคาปรับตัวสูงขึ้น
                msg = (
                    f"\n📈 [แจ้งเตือนราคาปรับขึ้น]\n"
                    f"📦 สินค้า: {product_name}\n"
                    f"💰 ราคาปรับขึ้นเป็น: ฿{current_price:.2f} (เดิม ฿{old_price:.2f})"
                )
                send_line_notification(LINE_NOTIFY_TOKEN, msg)
            else:
                print("ราคาสินค้าไม่มีการเปลี่ยนแปลง.")
    else:
        print("ไม่สามารถดึงข้อมูลราคาสินค้าเพื่อดำเนินการต่อได้")

if __name__ == "__main__":
    main()
