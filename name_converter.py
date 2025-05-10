#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re
import json
import os
from collections import Counter

# Định nghĩa mapping từ tên trong game sang tên thực tế
name_mapping_raw = {
    # Nhà phát hành/Công ty
    "Ninvento": "Nintendo",
    "Vena": "Sega",
    "Vonny": "Sony",
    "Mirconoft": "Microsoft",
    "Grapple": "Apple",
    "Govodore": "Commodore",
    "KickIT": "Kickstarter",
    "RiseVR": "Oculus",
    "Departure Science": "Aperture Science",
    
    # Máy chơi game (Consoles)
    "Govodore G64": "Commodore 64",
    "TES": "NES",
    "Master V": "Master System",
    "Gameling": "Game Boy",
    "Vena Gear": "Sega Game Gear",
    "Vena Oasis": "Sega Genesis",
    "Super TES": "Super NES",
    "Play System": "PlayStation",
    "Playsystem": "PlayStation",
    "TES 64": "NES 64",
    "DreamVast": "Dreamcast",
    "Playsystem 2": "PlayStation 2",
    "mBox": "Xbox",
    "Game Sphere": "GameCube",
    "Ninvento GS": "Nintendo DS",
    "Portable Playsystem": "Sony PlayStation Portable",
    "PPS": "PSP",
    "mBox 360": "Xbox 360",
    "Nuu": "Wii",
    "Playsystem 3": "Sony PlayStation 3",
    "Wuu": "Wii U",
    "mBox One": "Xbox One",
    "Playsystem 4": "Sony PlayStation 4",
    "mBox Next": "Xbox Series X/S",
    "Playsystem 5": "Sony PlayStation 5",
    "OYA": "Ouya",
    "Ninvento Swap": "Nintendo Switch",
    
    # Thiết bị khác
    "grPhone": "iPhone",
    "grPad": "iPad",
    "mPad": "Microsoft Surface",
    "Visorius": "Oculus Rift",
    
    # Phần mềm/Hệ điều hành
    "Mirconoft BOSS": "Microsoft MS-DOS",
    
    # Tựa game
    "Dinkey King": "Donkey Kong",
    
    # Nền tảng/Dịch vụ phân phối game
    "Grid": "Steam",
    
    # Sự kiện/Hội chợ game
    "G3": "E3",
    
    # Khác
    "Planet GG": "GameSpot",
    "Fun-Pads": "Joy-Cons"
}

# Sắp xếp name_mapping theo độ dài của key, từ dài đến ngắn
name_mapping = dict(sorted(name_mapping_raw.items(), key=lambda x: len(x[0]), reverse=True))

def process_file(input_file, output_file=None):
    """
    Đọc file đầu vào, tìm và thay thế các tên trong translation
    và tạo file kết quả có cả tên cũ và tên mới
    """
    if output_file is None:
        base, ext = os.path.splitext(input_file)
        output_file = f"{base}_converted{ext}"
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Tìm các khối "translation" trong file
    translation_pattern = r'"translation"\s*:\s*"([^"]+)"'
    matches = re.finditer(translation_pattern, content)
    
    # Lưu kết quả với format: Dòng số, Tên cũ, Tên mới, Đoạn văn bản
    results = []
    
    # Duyệt qua từng translation tìm được
    for match in matches:
        translation_text = match.group(1)
        line_number = content[:match.start()].count("\n") + 1
        
        # Kiểm tra nếu translation chứa bất kỳ tên nào cần thay thế
        for old_name, new_name in name_mapping.items():
            if old_name in translation_text:
                # Thêm vào danh sách kết quả
                results.append({
                    "line": line_number,
                    "old_name": old_name,
                    "new_name": new_name,
                    "text": translation_text
                })
    
    # Ghi kết quả ra file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("Dòng,Tên trong game,Tên thực tế,Đoạn văn bản\n")
        for result in results:
            f.write(f"{result['line']},{result['old_name']},{result['new_name']},\"{result['text']}\"\n")
    
    print(f"Đã tìm thấy {len(results)} kết quả và lưu vào {output_file}")
    return results

def create_conversion_file(input_file):
    """
    Tạo file JSON chứa thông tin chuyển đổi
    """
    output_file = "conversion_data.json"
    results = process_file(input_file)
    
    # Tổ chức dữ liệu theo nhóm
    organized_data = {
        "companies": {},
        "consoles": {},
        "devices": {},
        "software": {},
        "games": {},
        "platforms": {},
        "events": {},
        "other": {}
    }
    
    # Phân loại dữ liệu
    for result in results:
        old_name = result["old_name"]
        new_name = result["new_name"]
        
        # Kiểm tra nhóm
        if old_name in ["Ninvento", "Vena", "Vonny", "Mirconoft", "Grapple", "Govodore", "KickIT", "RiseVR", "Departure Science"]:
            organized_data["companies"][old_name] = new_name
        elif "Box" in old_name or "TES" in old_name or "Playsystem" in old_name or "Vena" in old_name or "Govodore G64" in old_name or "Dream" in old_name or "Game" in old_name:
            organized_data["consoles"][old_name] = new_name
        elif "Phone" in old_name or "Pad" in old_name or "Visorius" in old_name:
            organized_data["devices"][old_name] = new_name
        elif "BOSS" in old_name:
            organized_data["software"][old_name] = new_name
        elif old_name == "Dinkey King":
            organized_data["games"][old_name] = new_name
        elif old_name == "Grid":
            organized_data["platforms"][old_name] = new_name
        elif old_name == "G3":
            organized_data["events"][old_name] = new_name
        else:
            organized_data["other"][old_name] = new_name
    
    # Lưu dữ liệu vào file JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(organized_data, f, ensure_ascii=False, indent=2)
    
    print(f"Đã tạo file JSON {output_file} chứa dữ liệu chuyển đổi")

def create_replaced_file(input_file, output_file=None):
    """
    Tạo một phiên bản mới của file với các tên đã được thay thế
    """
    if output_file is None:
        base, ext = os.path.splitext(input_file)
        output_file = f"{base}_replaced{ext}"
    
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Tìm các khối "translation" trong file
    translation_pattern = r'("translation"\s*:\s*")([^"]+)(")'
    
    # Thống kê số lần thay thế
    replacement_count = Counter()
    
    # Hàm để thay thế từng phần khớp
    def replace_match(match):
        prefix = match.group(1)
        translation_text = match.group(2)
        suffix = match.group(3)
        
        # Thay thế tất cả tên cần chuyển đổi
        replaced_text = translation_text
        for old_name, new_name in name_mapping.items():
            # Tạo pattern có regex để tránh đổi một phần của từ khác
            # Ví dụ: "Vena" sẽ không thay thế trong "Venation"
            pattern = r'(?<!\w)' + re.escape(old_name) + r'(?!\w)'
            
            # Đếm số lần xuất hiện
            count = len(re.findall(pattern, replaced_text))
            if count > 0:
                replacement_count[old_name] += count
            
            # Thực hiện thay thế
            replaced_text = re.sub(pattern, f"{old_name} ({new_name})", replaced_text)
        
        return prefix + replaced_text + suffix
    
    # Thực hiện thay thế
    modified_content = re.sub(translation_pattern, replace_match, content)
    
    # Ghi kết quả ra file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(modified_content)
    
    print(f"Đã tạo file mới với các tên đã được thay thế: {output_file}")
    
    # Trả về Counter để có thể sử dụng cho báo cáo thống kê
    return replacement_count

def create_stats_report(replacement_count, output_file="name_replacement_stats.txt"):
    """
    Tạo báo cáo thống kê về số lượng thay thế cho mỗi tên
    """
    # Tổ chức dữ liệu thành các nhóm
    categories = {
        "Nhà phát hành/Công ty": ["Ninvento", "Vena", "Vonny", "Mirconoft", "Grapple", "Govodore", "KickIT", "RiseVR", "Departure Science"],
        "Máy chơi game (Consoles)": ["Govodore G64", "TES", "Master V", "Gameling", "Vena Gear", "Vena Oasis", "Super TES", "Play System", "Playsystem", "TES 64", "DreamVast", "Playsystem 2", "mBox", "Game Sphere", "Ninvento GS", "Portable Playsystem", "PPS", "mBox 360", "Nuu", "Playsystem 3", "Wuu", "mBox One", "Playsystem 4", "mBox Next", "Playsystem 5", "OYA", "Ninvento Swap"],
        "Thiết bị khác": ["grPhone", "grPad", "mPad", "Visorius"],
        "Phần mềm/Hệ điều hành": ["Mirconoft BOSS"],
        "Tựa game": ["Dinkey King"],
        "Nền tảng/Dịch vụ phân phối": ["Grid"],
        "Sự kiện/Hội chợ game": ["G3"],
        "Khác": ["Planet GG", "Fun-Pads"]
    }
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("BÁO CÁO THỐNG KÊ THAY THẾ TÊN\n")
        f.write("============================\n\n")
        
        # Tổng số lần thay thế
        total_replacements = sum(replacement_count.values())
        f.write(f"Tổng số lần thay thế: {total_replacements}\n\n")
        
        # Hiển thị thông tin theo từng nhóm
        for category, names in categories.items():
            f.write(f"{category}:\n")
            f.write("-" * 40 + "\n")
            
            # Lọc các tên thuộc nhóm này và sắp xếp theo số lần thay thế
            category_items = [(name, count) for name, count in replacement_count.items() if name in names]
            category_items.sort(key=lambda x: x[1], reverse=True)
            
            if not category_items:
                f.write("Không có thay thế nào trong nhóm này.\n\n")
                continue
            
            # Tính tổng số lần thay thế trong nhóm
            category_total = sum(count for _, count in category_items)
            f.write(f"Tổng số lần thay thế trong nhóm: {category_total}\n")
            
            # Hiển thị chi tiết từng tên
            for name, count in category_items:
                percentage = (count / total_replacements) * 100
                f.write(f"- {name} ({name_mapping[name]}): {count} lần ({percentage:.2f}%)\n")
            
            f.write("\n")
        
        # Hiển thị top 10 tên được thay thế nhiều nhất
        f.write("Top 10 tên được thay thế nhiều nhất:\n")
        f.write("-" * 40 + "\n")
        
        for i, (name, count) in enumerate(replacement_count.most_common(10), 1):
            percentage = (count / total_replacements) * 100
            f.write(f"{i}. {name} ({name_mapping[name]}): {count} lần ({percentage:.2f}%)\n")
    
    print(f"Đã tạo báo cáo thống kê thay thế tên: {output_file}")

if __name__ == "__main__":
    input_file = "i18n/vhgdt.js"
    # Tạo file CSV với các kết quả tìm thấy
    process_file(input_file, "name_conversion_results.csv")
    
    # Tạo file JSON với dữ liệu phân loại
    create_conversion_file(input_file)
    
    # Tạo file mới với các tên đã được thay thế và lấy thống kê
    replacement_count = create_replaced_file(input_file)
    
    # Tạo báo cáo thống kê
    create_stats_report(replacement_count) 