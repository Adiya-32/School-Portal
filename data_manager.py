import json
import os

def get_student_full_info(student_id):
    file_path = 'school_data.json'
    
    # Проверка: существует ли файл и не пустой ли он
    if not os.path.exists(file_path) or os.path.getsize(file_path) == 0:
        return None 

    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            return None # Если файл битый, возвращаем ничего

    # Твоя логика фильтрации (оставляем как было)
    student_records = [d for d in data if d['student_id'] == student_id]
    if not student_records: 
        return None
   

    summary = {}
    for r in student_records:
        subj = r['subject']
        summary.setdefault(subj, []).append(r['grade'])
    
    summary_str = ", ".join([f"{s}: {sum(g)/len(g):.1f}" for s, g in summary.items()])
    
    return {
        "name": "Алихан", # В идеале имя тоже в JSON
        "summary": summary_str,
        "all_grades": student_records
    }