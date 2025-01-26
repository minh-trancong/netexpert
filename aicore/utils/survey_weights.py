common_weights = {
    "network_purpose": 0.1,        # Tầm quan trọng trung bình cho mục đích sử dụng
    "number_of_devices": 0.15,    # Cần thiết để xác định số lượng thiết bị phù hợp
    "area_coverage": 0.15,        # Độ phủ sóng là yếu tố quan trọng
    "budget": 0.2,                # Ngân sách là yếu tố quyết định
    "security_level": 0.1,        # Bảo mật quan trọng nhưng có thể điều chỉnh
    "latency_tolerance": 0.1,     # Độ trễ mạng, quan trọng đối với ứng dụng nhạy cảm
    "preferred_frequency": 0.1,   # Ưu tiên tần số (2.4GHz/5GHz/6GHz)
    "brand_preference": 0.1       # Thương hiệu yêu thích (ít quan trọng hơn tính năng kỹ thuật)
}

household_weights = {
    "streaming_needs": 0.2,          # Nhu cầu xem video/streaming ảnh hưởng lớn đến băng thông
    "gaming_requirements": 0.2,      # Đòi hỏi độ trễ thấp và tốc độ cao
    "smart_home_devices": 0.15,      # Số lượng thiết bị nhà thông minh cần hỗ trợ
    "children_control": 0.1,         # Tính năng kiểm soát cho trẻ em
    "multi_floor_coverage": 0.15     # Phủ sóng đa tầng, quan trọng với nhà lớn
}

business_weights = {
    "number_of_employees": 0.2,        # Số lượng nhân viên ảnh hưởng đến khả năng mở rộng của mạng
    "mission_critical_apps": 0.25,     # Ứng dụng quan trọng cần mạng ổn định
    "guest_network": 0.15,             # Mạng riêng cho khách, phổ biến ở doanh nghiệp
    "vlan_requirement": 0.15,          # Yêu cầu VLAN để phân chia mạng nội bộ
    "poe_devices": 0.1,                # Nguồn PoE để cấp nguồn cho thiết bị
    "high_bandwidth_usage": 0.2,       # Sử dụng băng thông cao cho công việc chính
    "redundancy_requirements": 0.15    # Dự phòng kết nối mạng
}

weights = {
    "common": common_weights,
    "household": household_weights,
    "business": business_weights
}
