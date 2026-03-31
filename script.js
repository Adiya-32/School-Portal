async function loadData() {
    const idInput = document.getElementById('studentId');
    const aiCard = document.getElementById('ai-card');
    const aiText = document.getElementById('ai-insight');
    const table = document.getElementById('data-table');
    const list = document.getElementById('grades-list');

    const id = idInput.value;
    if (!id) return alert("Введите ID!");

    try {
        const url = `http://127.0.0.1:8000/student/${id}`;
        console.log("Запрос по адресу:", url);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json();
        console.log("Данные получены:", data);

        if (aiCard) aiCard.classList.remove('hidden');
        if (aiText) aiText.innerText = data.ai_insight;
        
        if (table) table.classList.remove('hidden');
        if (list) {
            list.innerHTML = ''; 
            if (data.grades && Array.isArray(data.grades)) {
                data.grades.forEach(grade => {
                    const item = document.createElement('div');
                    item.className = "flex justify-between border-b py-2 text-sm text-slate-200";
                    item.innerHTML = `<span>${grade.subject} (${grade.type})</span> 
                                      <span class="font-bold text-blue-400">${grade.grade}</span>`;
                    list.appendChild(item);
                });
            }
        } 

    } catch (error) {
        console.error("Детальная ошибка:", error);
        alert("Не удалось связаться с бэкендом. Проверь консоль (F12)!");
    }
}