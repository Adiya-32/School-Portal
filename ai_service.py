import os
async def get_ai_advice(student_id, stats, role="student"):
    prompts = {
        "student": "Ты ментор. Дай совет ученику, как подтянуть оценки.",
        "parent": "Ты классный руководитель. Расскажи родителю об успехах ребенка.",
        "teacher": "Ты аналитик. Выдели критические проблемы в обучении."
    }
from groq import Groq

# Инициализация (лучше через переменные окружения, но для хакатона можно вставить ключ напрямую)
client = Groq(api_key="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")

def get_parent_report(student_name, subject_summary):
    """
    Генерирует мягкий, но информативный отчет для родителей.
    subject_summary: строка вида "Математика: 5, 4 (отлично). Химия: 2, 3 (требует внимания)."
    """
    
    system_prompt = (
        "Ты — заботливый классный руководитель и аналитик данных BilimClass. "
        "Твоя цель: перевести сухие оценки в понятный отчет для родителей. "
        "ПРАВИЛА: 1. Начинай с позитива (в чем ребенок молодец). "
        "2. Если есть проблемы, называй их 'точками роста'. "
        "3. Дай один практический совет (например, повторить тему). "
        "4. Будь кратким (до 50 слов)."
    )

    user_content = f"Данные ученика {student_name}: {subject_summary}. Напиши отчет для родителя."

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile", # Самая мощная модель на Groq сейчас
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content}
        ],
        temperature=0.6,
        max_tokens=256
    )

    return completion.choices[0].message.content

# Пример использования
summary = "Математика: средний балл 4.8. Физика: средний балл 3.1 (завален последний СОР)."
print(get_parent_report("Алихан", summary))