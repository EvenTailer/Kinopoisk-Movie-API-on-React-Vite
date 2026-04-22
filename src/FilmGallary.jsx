import React from "react";
import { useState } from "react";


function FilmGallary({ films, pageCurrent, fetchTopFilms, handleCardClick,topPage,handleTopPageChange,title}) {

    const handlePageClick = (pageNumber) => {
        handleTopPageChange(pageNumber);
    };





    return (<>
        <div className="films-grid">
            <h1>{title}</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {films.map((film, index) => {
                    // Определяем класс рейтинга
                    let ratingClass = '';
                    const rating = parseFloat(film.rating);
                    if (rating <= 5) ratingClass = 'rating-low';
                    else if (rating <= 6.5) ratingClass = 'rating-medium';
                    else if (rating > 6.5) ratingClass = 'rating-high';
                    else ratingClass = 'rating-null';

                    return (
                        <div key={film.filmId} className="film-card">
                            <img
                                onClick={() => handleCardClick(film.filmId)}
                                src={film.posterUrlPreview}
                                alt={film.nameRu}
                            />
                            <h3>{film.nameRu}</h3>
                            <p>
                                <span>{film.year}</span>
                                <span className={`rating-circle ${ratingClass}`}>
                                    {film.rating}
                                </span>
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="change_page">
            {Array.from({ length: pageCurrent }).map((_, index) => {
                const pageNum = index + 1;
                return (
                    <button
                        key={index}
                        onClick={() => handlePageClick(pageNum)}
                        className={pageNum === topPage ? 'active-page' : ''}
                    >
                        {pageNum}
                    </button>
                );
            })}
        </div>
    </>
    )
}

export default FilmGallary;