import json
import random
from datetime import datetime, timedelta

def generate_mock_data():
    students = [
        {"id": "001", "name": "Алихан", "profile": "average"},
        {"id": "002", "name": "Мария", "profile": "excellent"},
        {"id": "003", "name": "Иван", "profile": "struggling"}
    ]
    
    subjects = ["Математика", "Физика", "Информатика", "История"]
    types = ["ДЗ", "Классная работа", "СОР", "СОЧ"]
    
    # Веса для оценок (чтобы данные были реалистичными)
    weights = {
        'excellent': [0, 0, 1, 4, 10], # Больше 4 и 5
        'struggling': [2, 5, 8, 3, 1], # Больше 2 и 3
        'average': [1, 2, 10, 5, 2]    # В основном 3 и 4
    }

    dataset = []
    start_date = datetime.now() - timedelta(days=30)

    for student in students:
        for subject in subjects:
            # Генерируем по 10 оценок для каждого предмета
            for i in range(10):
                date = start_date + timedelta(days=i*3 + random.randint(0, 2))
                grade = random.choices([1, 2, 3, 4, 5], weights=weights[student['profile']])[0]
                
                dataset.append({
                    "student_id": student['id'],
                    "student_name": student['name'],
                    "subject": subject,
                    "grade": grade,
                    "type": random.choice(types),
                    "date": date.strftime("%Y-%m-%d")
                })

    with open('school_data.json', 'w', encoding='utf-8') as f:
        json.dump(dataset, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Готово! Сгенерировано {len(dataset)} записей в school_data.json")

if __name__ == "__main__":
    generate_mock_data()