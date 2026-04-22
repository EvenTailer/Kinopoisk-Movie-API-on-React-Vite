import React from 'react';
import './About.css';


function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>🎬 О проекте</h1>
        <p>Movie Explorer — приложение для поиска и изучения фильмов с использованием открытого API Кинопоиска.</p>
      </div>

      <div className="about-content">
        <div className="about-text">
          <h2>👨‍💻 Автор</h2>
          <div className="author-info">
            <img src='/photo_2026-04-12_18-00-41.jpg' alt="Илья Граматнев" className="author-photo" />
            <div>
              <p><strong>Илья Граматнев</strong></p>
              <p>Начинающий React-разработчик, увлечённый созданием современных веб-приложений.</p>
              <p>📧 igramatnev@gmail.com</p>
              <p>🔗 <a href="https://github.com/EvenTailer" target="_blank" rel="noopener noreferrer">GitHub</a></p>
            </div>
          </div>

          <h2>🛠️ Технологии</h2>
          <ul className="tech-list">
            <li>⚛️ React 18 (хуки, функциональные компоненты)</li>
            <li>⚡ Vite – быстрая сборка</li>
            <li>🎨 CSS3 (Flexbox, Grid, анимации)</li>
            <li>🌐 Kinopoisk API Unofficial</li>
            <li>💾 localStorage (закладки)</li>
            <li>🔍 Debounce для оптимизации поиска</li>
          </ul>

          <h2>✨ Возможности</h2>
          <ul className="features-list">
            <li>✅ Топ-100 популярных фильмов</li>
            <li>✅ Семейные фильмы (отдельная коллекция)</li>
            <li>✅ Пагинация с активной страницей</li>
            <li>✅ Поиск фильмов с задержкой</li>
            <li>✅ Детальная страница: трейлер, описание, рейтинг</li>
            <li>✅ Похожие фильмы</li>
            <li>✅ Закладки с сохранением в localStorage</li>
            <li>✅ Боковое меню с анимацией</li>
            <li>✅ Адаптивный дизайн</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;