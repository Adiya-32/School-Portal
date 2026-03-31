import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Mock database with translations
  const newsData = {
    ru: [
      { id: 1, title: "Открытие новой лаборатории", date: "2024-03-20", content: "В нашем лицее открылась современная лаборатория робототехники...", category: "События" },
      { id: 2, title: "Победа на олимпиаде", date: "2024-03-18", content: "Ученики 10 класса заняли призовые места на международной олимпиаде по математике.", category: "Достижения" },
      { id: 3, title: "Весенний бал", date: "2024-03-15", content: "Приглашаем всех на ежегодный весенний бал, который состоится в следующую пятницу.", category: "Мероприятия" },
    ],
    kz: [
      { id: 1, title: "Жаңа зертхананың ашылуы", date: "2024-03-20", content: "Біздің лицейде заманауи робототехника зертханасы ашылды...", category: "Оқиғалар" },
      { id: 2, title: "Олимпиададағы жеңіс", date: "2024-03-18", content: "10-сынып оқушылары халықаралық математика олимпиадасында жүлделі орындарға ие болды.", category: "Жетістіктер" },
      { id: 3, title: "Көктемгі балл", date: "2024-03-15", content: "Келесі жұмада өтетін жыл сайынғы көктемгі баллға барлығыңызды шақырамыз.", category: "Іс-шаралар" },
    ],
    en: [
      { id: 1, title: "New Laboratory Opening", date: "2024-03-20", content: "A modern robotics laboratory has opened in our lyceum...", category: "Events" },
      { id: 2, title: "Olympiad Victory", date: "2024-03-18", content: "10th grade students won prizes at the international mathematics olympiad.", category: "Achievements" },
      { id: 3, title: "Spring Ball", date: "2024-03-15", content: "We invite everyone to the annual spring ball, which will take place next Friday.", category: "Activities" },
    ]
  };

  const aiAdviceData = {
    ru: "На основе твоих оценок по математике (96% в 4 четверти), тебе стоит обратить внимание на углубленное изучение алгоритмов. По физике наблюдается стабильный рост, продолжай в том же духе!",
    kz: "Математикадан алған бағаларың негізінде (4-тоқсанда 96%), алгоритмдерді тереңдетіп оқуға көңіл бөлуің керек. Физикадан тұрақты өсім байқалады, осылай жалғастыра бер!",
    en: "Based on your math grades (96% in the 4th quarter), you should focus on advanced algorithm study. There's steady growth in physics, keep it up!"
  };

  const students = [
    { id: "1", name: "Алибек", surname: "Сейтов", class: "10A", school: "Aqbobek Lyceum", score: 4.9 },
    { id: "2", name: "Мария", surname: "Иванова", class: "10A", school: "Aqbobek Lyceum", score: 4.8 },
    { id: "3", name: "Арман", surname: "Каримов", class: "10B", school: "Aqbobek Lyceum", score: 4.7 },
    { id: "4", name: "Дамир", surname: "Асанов", class: "10A", school: "Aqbobek Lyceum", score: 3.2 },
    { id: "5", name: "Айгерим", surname: "Муратова", class: "10A", school: "Aqbobek Lyceum", score: 3.4 },
  ];

  const teacherClasses = [
    { id: "10A", name: "10A", subject: "Математика", studentCount: 25 },
    { id: "10B", name: "10B", subject: "Математика", studentCount: 22 },
    { id: "11A", name: "11A", subject: "Алгебра", studentCount: 20 },
  ];

  const parentFeedData = {
    ru: [
      { id: 1, type: "grade", text: "Ваш сын Алибек получил 5 по истории", date: "Сегодня, 14:20" },
      { id: 2, type: "event", text: "Объявлено родительское собрание: 5 апреля в 18:00", date: "Вчера, 10:00" },
      { id: 3, type: "achievement", text: "Алибек занял 1 место в школьной олимпиаде по физике", date: "2 дня назад" },
    ],
    kz: [
      { id: 1, type: "grade", text: "Сіздің ұлыңыз Әлібек тарихтан 5 алды", date: "Бүгін, 14:20" },
      { id: 2, type: "event", text: "Ата-аналар жиналысы жарияланды: 5 сәуір сағат 18:00-де", date: "Кеше, 10:00" },
      { id: 3, type: "achievement", text: "Әлібек физикадан мектеп олимпиадасында 1-орын алды", date: "2 күн бұрын" },
    ],
    en: [
      { id: 1, type: "grade", text: "Your son Alibek got a 5 in History", date: "Today, 14:20" },
      { id: 2, type: "event", text: "Parent meeting announced: April 5 at 6:00 PM", date: "Yesterday, 10:00" },
      { id: 3, type: "achievement", text: "Alibek took 1st place in the school physics olympiad", date: "2 days ago" },
    ]
  };

  const birthdaysData = {
    ru: [
      { name: "Алихан", surname: "Маратов", class: "10A", date: "30 Марта" },
      { name: "Айгерим", surname: "Сабитова", class: "9B", date: "31 Марта" },
    ],
    kz: [
      { name: "Әлихан", surname: "Маратов", class: "10A", date: "30 наурыз" },
      { name: "Әйгерім", surname: "Сабитова", class: "9B", date: "31 наурыз" },
    ],
    en: [
      { name: "Alikhan", surname: "Maratov", class: "10A", date: "March 30" },
      { name: "Aigerim", surname: "Sabitova", class: "9B", date: "March 31" },
    ]
  };

  const eventsData = {
    ru: [
      { title: "Олимпиада по физике", date: "5 Апреля", time: "10:00" },
      { title: "Весенний бал", date: "12 Апреля", time: "18:00" },
    ],
    kz: [
      { title: "Физикадан олимпиада", date: "5 сәуір", time: "10:00" },
      { title: "Көктемгі балл", date: "12 сәуір", time: "18:00" },
    ],
    en: [
      { title: "Physics Olympiad", date: "April 5", time: "10:00" },
      { title: "Spring Ball", date: "April 12", time: "18:00" },
    ]
  };

  const heroesData = {
    ru: [
      { name: "Данияр", surname: "Оспанов", achievement: "Победитель респ. олимпиады", image: "https://picsum.photos/seed/hero1/200/200" },
      { name: "Сара", surname: "Ли", achievement: "100 баллов по математике", image: "https://picsum.photos/seed/hero2/200/200" },
    ],
    kz: [
      { name: "Данияр", surname: "Оспанов", achievement: "Респ. олимпиада жеңімпазы", image: "https://picsum.photos/seed/hero1/200/200" },
      { name: "Сара", surname: "Ли", achievement: "Математикадан 100 балл", image: "https://picsum.photos/seed/hero2/200/200" },
    ],
    en: [
      { name: "Daniyar", surname: "Ospanov", achievement: "National Olympiad Winner", image: "https://picsum.photos/seed/hero1/200/200" },
      { name: "Sara", surname: "Lee", achievement: "100 points in Mathematics", image: "https://picsum.photos/seed/hero2/200/200" },
    ]
  };

  const grades = {
    "1": [
      { 
        subject: "Математика", 
        quarters: [
          { 
            q: 1, 
            sor: [{ score: 10, total: 11 }, { score: 20, total: 20 }, { score: 12, total: 15 }], 
            fo: [9, 10, 8, 10, 8, 9], 
            sorFoPercent: 92,
            soch: { score: 30, total: 30 },
            sochPercent: 100,
            final: 96 
          },
          { 
            q: 2, 
            sor: [{ score: 15, total: 15 }, { score: 18, total: 20 }], 
            fo: [10, 10, 9], 
            sorFoPercent: 94,
            soch: { score: 28, total: 30 },
            sochPercent: 93,
            final: 94 
          },
          { q: 3, sor: [], fo: [], sorFoPercent: 0, soch: { score: 0, total: 30 }, sochPercent: 0, final: 0 },
          { q: 4, sor: [], fo: [], sorFoPercent: 0, soch: { score: 0, total: 30 }, sochPercent: 0, final: 0 }
        ],
        yearly: 95,
        comment: "Отличная работа на уроке"
      },
      { 
        subject: "Физика", 
        quarters: [
          { 
            q: 1, 
            sor: [{ score: 8, total: 10 }], 
            fo: [8, 7, 9], 
            sorFoPercent: 82,
            soch: { score: 25, total: 30 },
            sochPercent: 83,
            final: 82 
          },
          { q: 2, sor: [], fo: [], sorFoPercent: 0, soch: { score: 0, total: 30 }, sochPercent: 0, final: 0 },
          { q: 3, sor: [], fo: [], sorFoPercent: 0, soch: { score: 0, total: 30 }, sochPercent: 0, final: 0 },
          { q: 4, sor: [], fo: [], sorFoPercent: 0, soch: { score: 0, total: 30 }, sochPercent: 0, final: 0 }
        ],
        yearly: 82,
        comment: "Хороший прогресс"
      }
    ]
  };

  const classStudents = {
    "10A": [
      { 
        id: "1", 
        name: "Алибек С.", 
        fo: [9, 10, 8, 10, 8, 9], 
        sor: [{ score: 10, total: 11 }, { score: 20, total: 20 }, { score: 12, total: 15 }], 
        sorFoPercent: 92,
        soch: { score: 30, total: 30 },
        sochPercent: 100,
        final: 96, 
        comment: "Стабильно" 
      },
      { 
        id: "2", 
        name: "Мария И.", 
        fo: [10, 9, 10], 
        sor: [{ score: 11, total: 11 }, { score: 18, total: 20 }], 
        sorFoPercent: 94,
        soch: { score: 29, total: 30 },
        sochPercent: 97,
        final: 95, 
        comment: "Молодец" 
      },
    ],
    "10B": [
      { 
        id: "3", 
        name: "Арман К.", 
        fo: [8, 8, 7], 
        sor: [{ score: 9, total: 11 }], 
        sorFoPercent: 78,
        soch: { score: 24, total: 30 },
        sochPercent: 80,
        final: 79, 
        comment: "Хорошо" 
      },
    ]
  };

  const users = [
    { id: "1", name: "Алибек", surname: "Сейтов", role: "student", class: "10A", email: "alibek@aqbobek.kz" },
    { id: "t1", name: "Бауржан", surname: "Ахметов", role: "teacher", subject: "Математика", isClassTeacher: true, managedClass: "10A", email: "baur@aqbobek.kz" },
    { id: "t2", name: "Ольга", surname: "Смирнова", role: "teacher", subject: "Физика", isClassTeacher: false, email: "olga@aqbobek.kz" },
    { id: "a1", name: "Админ", surname: "Лицея", role: "admin", class: "-", email: "admin@aqbobek.kz" },
  ];

  app.get("/api/news", (req, res) => {
    const lang = (req.query.lang as string) || "ru";
    res.json(newsData[lang as keyof typeof newsData] || newsData.ru);
  });

  app.post("/api/news", (req, res) => {
    const newItem = {
      id: newsData.ru.length + 1,
      ...req.body,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
    };
    newsData.ru.unshift(newItem);
    res.json(newItem);
  });

  interface SchoolStats {
    totalStudents: number;
    totalTeachers: number;
    averageScoreByGrade: { grade: string; score: number }[];
  }

  const schoolStats: SchoolStats = {
    totalStudents: 1240,
    totalTeachers: 86,
    averageScoreByGrade: [
      { grade: "10A", score: 4.85 },
      { grade: "10B", score: 4.7 },
      { grade: "11A", score: 4.6 },
      { grade: "11B", score: 4.5 },
    ]
  };

  app.get("/api/top-students", (req, res) => {
    res.json(students.filter(s => s.score >= 4.5).slice(0, 10));
  });

  app.get("/api/teacher/classes", (req, res) => {
    res.json(teacherClasses);
  });

  app.get("/api/teacher/class-students/:classId", (req, res) => {
    const classId = req.params.classId;
    res.json(classStudents[classId] || []);
  });

  app.post("/api/teacher/update-grade", (req, res) => {
    const { studentId, classId, field, value } = req.body;
    console.log(`Updating ${field} for student ${studentId} in class ${classId} to ${value}`);
    // In a real app, we would update the mock database here
    res.json({ success: true });
  });

  app.get("/api/teacher/risk-zone", (req, res) => {
    res.json(students.filter(s => s.score < 3.5));
  });

  app.get("/api/admin/users", (req, res) => {
    res.json(users);
  });

  app.delete("/api/admin/users/:id", (req, res) => {
    console.log(`Deleting user ${req.params.id}`);
    res.json({ success: true });
  });

  app.get("/api/parent/feed", (req, res) => {
    const lang = (req.query.lang as string) || "ru";
    res.json(parentFeedData[lang as keyof typeof parentFeedData] || parentFeedData.ru);
  });

  app.get("/api/kiosk/data", (req, res) => {
    const lang = (req.query.lang as string) || "ru";
    res.json({
      birthdays: birthdaysData[lang as keyof typeof birthdaysData] || birthdaysData.ru,
      events: eventsData[lang as keyof typeof eventsData] || eventsData.ru,
      heroes: heroesData[lang as keyof typeof heroesData] || heroesData.ru
    });
  });

  app.get("/api/admin/stats", (req, res) => {
    res.json(schoolStats);
  });

  app.get("/api/grades/:studentId", (req, res) => {
    const studentId = req.params.studentId;
    res.json(grades[studentId] || []);
  });

  app.post("/api/ai-advice", (req, res) => {
    const { studentId, lang } = req.body;
    const language = (lang as string) || "ru";
    res.json({ 
      advice: aiAdviceData[language as keyof typeof aiAdviceData] || aiAdviceData.ru
    });
  });

  app.post("/api/register", (req, res) => {
    const userData = req.body;
    console.log("Registering user:", userData);
    res.json({ success: true, message: "Регистрация успешна!" });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
