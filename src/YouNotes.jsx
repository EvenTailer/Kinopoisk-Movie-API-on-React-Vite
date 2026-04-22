import React, { useState } from "react";

function YouNotes({ notes, handleCardClick, setNotes }) {

    const [searchNote, setSearchNote] = useState('');

    const displayedNotes = searchNote.trim() === '' ?
        notes :
        notes.filter(note => note.nameRu.toLowerCase().includes(searchNote.toLowerCase()));


    function deleteNote(id) {
        setNotes(notes.filter(note => note.kinopoiskId !== id));
    }

    return (<>
        <div className="search-wrapper">
            <input
                value = {searchNote}
                className="input_search"
                onChange={(even) => setSearchNote(even.target.value)}

                placeholder="Поиск фильма в закладках..."
            />
            {searchNote && (
                <button className="clear-btn"
                    onClick={() => setSearchNote('')}
                >
                    ✕
                </button>
            )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {displayedNotes.map((note, index) => {
                // Определяем класс рейтинга
                let ratingClass = '';
                const rating = parseFloat(note.ratingKinopoisk);
                if (rating <= 5) ratingClass = 'rating-low';
                else if (rating <= 6.5) ratingClass = 'rating-medium';
                else if (rating > 6.5) ratingClass = 'rating-high';
                else ratingClass = 'rating-null';

                return (

                    <div key={note.kinopoiskId} className="film-card">
                        <img
                            onClick={() => handleCardClick(note.kinopoiskId)}
                            src={note.posterUrlPreview}
                            alt={note.nameRu}
                        />
                        <h3>{note.nameRu}</h3>
                        <h3>{note.year}</h3>
                        <p>
                            <span>{note.year}</span>
                            <span><button
                                className="delete_note"
                                onClick={() => deleteNote(note.kinopoiskId)}
                            >Удалить</button></span>
                            <span className={`rating-circle ${ratingClass}`}>
                                {note.ratingKinopoisk}
                            </span>
                        </p>
                    </div>

                );

            })}
        </div>
    </>)
}

export default YouNotes;