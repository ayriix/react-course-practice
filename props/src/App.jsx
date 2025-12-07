/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from "react";
import "./index.css";

const cardData = [
  {
    title: "Мокка",
    description: "Развиваем финтех-продукт для международного рынка",
    date: "24 апреля 2024",
    imageUrl: "/img-1.jpeg",
    tags: ["#финтех", "#международный", "#рынок"],
    archived: false,
  },
  {
    title: "Деньги Вперед",
    description: "Фронтенд и бэкенд для сервиса выплат зарплат по запросу",
    date: "16 января 2024",
    imageUrl: "/img-2.jpeg",
    tags: ["#финансы", "#сервис", "#выплаты"],
    archived: false,
  },
  {
    title: "ResolHR",
    description: "Помогли HR-tech-стартапу с кастомизацией для VIP-клиентов",
    date: "10 октября 2023",
    imageUrl: "/img-3.jpeg",
    tags: ["#HR", "#кастомизация", "#VIP"],
    archived: true,
  },
  {
    title: "ActivePlatform",
    description: "Интеграция Adobe и развитие платформы комплексной подписки",
    date: "10 ноября 2022",
    imageUrl: "/img-4.jpeg",
    tags: ["#интеграция", "#платформа", "#подписка"],
    archived: false,
  },
  {
    title: "START",
    description: "Разработали платформу A/B тестов для стримингового сервиса",
    date: "22 сентября 2022",
    imageUrl: "/img-5.jpeg",
    tags: ["#A/B тесты", "#стриминг", "#платформа"],
    archived: false,
  },
  {
    title: "Mindbox",
    description:
      "Поддерживаем редизайн платформы автоматизированного маркетинга",
    date: "21 сентября 2022",
    imageUrl: "/img-6.jpeg",
    tags: ["#маркетинг", "#редизайн", "#автоматизация"],
    archived: false,
  },
];

export default function CardContainer() {
  return (
    <div className="card-container">
      {cardData.map((card) => (
        <Card cardData={card} />
      ))}
    </div>
  );
}

function Card({ cardData }) {
  return cardData.archived ? (
    ""
  ) : (
    <div className="card">
      <img
        src={cardData.imageUrl}
        alt={cardData.title}
        className="card-image"
      />
      <div className="card-content">
        <h2 className="card-title">{cardData.title}</h2>
        <p className="card-description" style={{ width: "400px" }}>
          {cardData.description}
        </p>
        <p className="card-date">{cardData.releaseDate}</p>
        <div className="card-tags">
          {cardData.tags.map((tag) => (
            <CardTag tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CardTag({ tag }) {
  return <div className="card-tag">{tag}</div>;
}
