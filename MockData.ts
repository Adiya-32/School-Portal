import { SubjectGrade, NewsItem } from './types';

export const MOCK_STUDENT = {
  id: "001",
  name: "Алибек",
  surname: "Смагулов",
  class: "10-А",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  grades: [
    { subject: "Математика", score: 95, fo: 10, sor: 18, soch: 28, final: 95 },
    { subject: "Физика", score: 82, fo: 8, sor: 15, soch: 22, final: 82 },
    { subject: "Информатика", score: 100, fo: 10, sor: 20, soch: 30, final: 100 },
    { subject: "История", score: 74, fo: 7, sor: 12, soch: 20, final: 74 },
  ],
  ai_insight: "Алибек, ты настоящий мастер алгоритмов! Твой балл по Информатике идеален. Совет: удели чуть больше внимания датам по Истории, и твоя средняя оценка станет лучшей в классе! 🚀"
};

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '001',
    title: 'Робототехника: Новый кружок!',
    content: 'Записывайтесь на занятия по субботам. Будем собирать дронов!',
    date: '20.05.2024',
    category: 'Спорт'
  },
  {
    id: '002',
    title: 'Результаты Олимпиады',
    content: 'Наши ученики заняли призовые места по Математике.',
    date: '18.05.2024',
    category: 'Академические'
  }
];