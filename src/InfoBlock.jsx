// import { useEffect } from "react";

// function InfoBlock({ handleBackToList, currentFilm, trailerFilm, toggleNote, notes, fanArt, handleCardClick, relatedMovies }) {

//     const isAdded = notes.some(note => note.kinopoiskId === currentFilm.kinopoiskId);

//     return (<>
//         <div className='film_info'>
//             <button className="back-button" onClick={handleBackToList}>
//                 ← Назад к списку
//             </button>
//             <div className="film-detail-grid">
//                 <img src={currentFilm.posterUrl} alt={currentFilm.nameRu} />
//                 <div className="film-detail-info">
//                     <h1>{currentFilm.nameRu}</h1>
//                     <p><strong>Год:</strong> {currentFilm.year}</p>
//                     <p><strong>Рейтинг Кинопоиска:</strong>
//                         <span className="rating-big" style={{
//                             backgroundColor:
//                                 currentFilm.ratingKinopoisk <= 5 ? '#e63946' :
//                                     currentFilm.ratingKinopoisk <= 6.5 ? '#f4a261' : '#2a9d8f'
//                         }}>
//                             {currentFilm.ratingKinopoisk}
//                         </span>
//                     </p>
//                     <p><strong>Описание:</strong> {currentFilm.description || 'Описание отсутствует'}</p>
//                     <button
//                         className={`add_notes ${isAdded ? 'added' : ''}`}
//                         onClick={() => toggleNote(currentFilm)}
//                     >
//                         {isAdded ? 'Удалить из закладок' : 'Добавить в закладки'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//         <div>
//             {trailerFilm && trailerFilm.items && trailerFilm.items.length > 0 ? (<>
//                 <iframe
//                     width="100%"
//                     height="400"
//                     src={`https://www.youtube.com/embed/${trailerFilm.items[0].url.split('v=')[1]}`}
//                     title="Трейлер фильма"
//                     frameBorder="0"
//                     allowFullScreen
//                 ></iframe>

//             </>
//             ) : (<>
//                 <div
//                     className="error_video"
//                 >
//                     <p

//                     >Увы трейлер не найден</p>
//                 </div>

//             </>
//             )}

//             {fanArt && fanArt.length > 0 && (
//                 <div className="similar-movies">
//                     <h3>Похожие фильмы</h3>
//                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
//                         {fanArt.map(film => (
//                             <div key={film.filmId} className="film-card" onClick={() => handleCardClick(film.filmId)}>
//                                 <img src={film.posterUrlPreview} alt={film.nameRu} />
//                                 <h4>{film.nameRu}</h4>
//                                 <p>{film.year}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {fanArt && fanArt.length === 0 &&(
//                 <div className="similar-movies">
//                     <h3>Похожие фильмы</h3>
//                     <p>Для этого фильма пока нет рекомендаций.</p>
//                 </div>
//             )}
//         </div>
//     </>)
// }

// export default InfoBlock;

import { useEffect } from "react";

function InfoBlock({ handleBackToList, currentFilm, trailerFilm, toggleNote, notes, fanArt, handleCardClick, relatedMovies }) {

    const isAdded = notes.some(note => note.kinopoiskId === currentFilm.kinopoiskId);

    return (
        <div className="film_info">
            <button className="back-button" onClick={handleBackToList}>
                ← Назад к списку
            </button>

            <div className="film-detail-grid">
                <div className="film-poster">
                    <img src={currentFilm.posterUrl} alt={currentFilm.nameRu} />
                </div>
                <div className="film-detail-info">
                    <h1>{currentFilm.nameRu}</h1>
                    <div className="film-meta">
                        <span className="meta-year">📅 {currentFilm.year}</span>
                        <span className="meta-rating">
                            ⭐ Рейтинг: 
                            <span className="rating-big" style={{
                                backgroundColor:
                                    currentFilm.ratingKinopoisk <= 5 ? '#e63946' :
                                    currentFilm.ratingKinopoisk <= 6.5 ? '#f4a261' : '#2a9d8f'
                            }}>
                                {currentFilm.ratingKinopoisk}
                            </span>
                        </span>
                    </div>
                    <p className="film-description">
                        <strong>📖 Описание:</strong> {currentFilm.description || 'Описание отсутствует'}
                    </p>
                    <button
                        className={`add_notes ${isAdded ? 'added' : ''}`}
                        onClick={() => toggleNote(currentFilm)}
                    >
                        {isAdded ? '🗑️ Удалить из закладок' : '⭐ Добавить в закладки'}
                    </button>
                </div>
            </div>

            {/* Трейлер */}
            <div className="trailer-section">
                <h3>🎥 Трейлер</h3>
                {trailerFilm && trailerFilm.items && trailerFilm.items.length > 0 ? (
                    <div className="trailer-wrapper">
                        <iframe
                            className="trailer-iframe"
                            src={`https://www.youtube.com/embed/${trailerFilm.items[0].url.split('v=')[1]}`}
                            title="Трейлер фильма"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <div className="error_video">
                        <p>🎬 Трейлер временно недоступен</p>
                    </div>
                )}
            </div>

            {/* Похожие фильмы */}
            <div className="similar-section">
                <h3>🎞️ Похожие фильмы</h3>
                {fanArt && fanArt.length > 0 ? (
                    <div className="similar-grid">
                        {fanArt.map(film => (
                            <div 
                                key={film.filmId} 
                                className="similar-card" 
                                onClick={() => handleCardClick(film.filmId)}
                            >
                                <img src={film.posterUrlPreview} alt={film.nameRu} />
                                <div className="similar-info">
                                    <h4>{film.nameRu}</h4>
                                    <p>{film.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="similar-empty">
                        <p>✨ Для этого фильма пока нет рекомендаций</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoBlock;