from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()
@app.get("/")
async def root():
    return {"status": "FastAPI is running", "message": "Go to /student/1 to see data"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_local_insight(name, grades):
    # Находим средний балл
    scores = [g['grade'] for g in grades]
    avg = sum(scores) / len(scores)
    
    # Находим слабые предметы
    weak_subjects = [g['subject'] for g in grades if g['grade'] <= 3]
    
    # Логика "умных советов"
    if avg >= 4.8:
        quotes = [
            f"Фантастика, {name}! Ты идешь на рекорд школы. Не сбавляй темп!",
            f"{name}, твои результаты — пример для подражания. Так держать!",
            "Уровень знаний: Профессор. Пора готовиться к олимпиадам!"
        ]
    elif weak_subjects:
        subj = ", ".join(weak_subjects)
        quotes = [
            f"Хороший старт, но {subj} требует внимания. Подтяни теорию!",
            f"Фокусируйся на предмете '{weak_subjects[0]}'. Одна консультация — и будет 5!",
            f"Твои баллы по предметам {subj} ниже ожидаемых. Давай исправим это?"
        ]
    else:
        quotes = [
            "Стабильный результат! Ты на правильном пути.",
            "Хорошая работа. Если добавишь немного усердия, станешь отличником!",
            "Твоя успеваемость в норме. Главное — регулярность."
        ]
    
    return random.choice(quotes)

@app.get("/student/{student_id}")
async def get_student(student_id: str):
    # Имитируем разные данные для разных ID
    if student_id == "001":
        name = "Алибек"
        grades = [
            {"subject": "Математика", "type": "СОР", "grade": 5},
            {"subject": "Физика", "type": "ФО", "grade": 3},
            {"subject": "Информатика", "type": "СОЧ", "grade": 5}
        ]
    else:
        name = "Ученик #" + student_id
        grades = [
            {"subject": "География", "type": "СОР", "grade": 4},
            {"subject": "Химия", "type": "ФО", "grade": 4}
        ]

    return {
        "id": student_id,
        "name": name,
        "ai_insight": generate_local_insight(name, grades),
        "grades": grades
    }