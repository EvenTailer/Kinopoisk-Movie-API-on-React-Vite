import { useState, useRef, useEffect } from "react";

function SearchFilm({ searchFilms, searchQuery, setSearchQuery }) {
    const timerRef = useRef(null);
    const inputRef = useRef(null)

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            inputRef.current?.focus();
        }
    }, [searchQuery])

    function handleKeyWords(e) {
        const newValue = e.target.value;
        setSearchQuery(newValue);

        if (timerRef.current) {
            clearTimeout(timerRef.current)
        }

        timerRef.current = setTimeout(() => {
            if (newValue.trim()) {
                searchFilms(newValue);
            }
        }, 1000)
    }



    return (<>

        <div className="search-wrapper">
            <input
                ref={inputRef}
                className="input_search"
                value={searchQuery}
                onChange={handleKeyWords}
                placeholder="Поиск фильмов..."
            />
            {searchQuery && (
                <button className="clear-btn" onClick={() => setSearchQuery('')}>
                    ✕
                </button>
            )}
        </div>


    </>

    )
}
export default SearchFilm;