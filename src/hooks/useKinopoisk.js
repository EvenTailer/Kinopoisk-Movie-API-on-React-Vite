import { useState, useCallback, useRef } from "react"

const API_KEY = "8b8953de-39e1-4060-9c42-f753004f84cb";
const BASE_URL = "https://kinopoiskapiunofficial.tech/api";
// const API_KEY = "e0fbb552-e178-4471-9e2e-12ab59b46708";

export function useKinopoisk() {
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pageCurrent, setPageCurrent] = useState(0);
    const [currentFilm, setCurrentFilm] = useState(null)
    const [trailerFilm, setTrailerFilm] = useState(null)
    const [fanArt, setFanArt] = useState([]) // получился не фан арт, а похожие фильмы 
    const [familyFilms, setFamilyFilms] = useState([]);
    const [pageFamilyTop, setPageFamilyTop] = useState(1)



    //  список фильмов
    const fetchTopFilms = useCallback(async (pageCurrent) => {
        setLoading(true);
        setError(null);

        try {
            const url = `${BASE_URL}/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${pageCurrent}`;


            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const data = await response.json();
            setPageCurrent(data.pagesCount)
            setFilms(data.films || []);

        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false)
        }
    }, []);


    //  поиск фильмов
    const searchFilms = useCallback(async (keyword) => {
        setLoading(true);
        setError(null);

        try {
            const url = `${BASE_URL}/v2.1/films/search-by-keyword?keyword=${keyword}`;
            const response = await fetch(url, {
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const data = await response.json();
            const newFilms = data.films || [];
            setFilms(newFilms);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }

    }, []);

    // информация о фильме
    const fullInfoFilm = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const url = `${BASE_URL}/v2.2/films/${id}`;
            const response = await fetch(url, {
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const data = await response.json();
            setCurrentFilm(data);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }

    }, [])
    // трейлер к фильму
    const filmTrailer = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const url = `${BASE_URL}/v2.2/films/${id}/videos`;
            const response = await fetch(url, {
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const data = await response.json();
            setTrailerFilm(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    }, []);
    // Похожие фильмы
    const relatedMovies = useCallback(async (id) => {
        setLoading(true);
        setError(null);

        try {
            const url = `${BASE_URL}/v2.2/films/${id}/similars`;
            const response = await fetch(url, {
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }
            const data = await response.json();
            setFanArt(data.items || []);

        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }

    }, []);

    // Семейные фильмы
    const getFamilyFilms = useCallback(async (page = 1) => {
        // const validPage = Math.max(1, page);
        setLoading(true);
        setError(null);

        try {
            const url = `${BASE_URL}/v2.2/films/collections?type=FAMILY&page=${page}`;
            const response = await fetch(url, {
                headers: {
                    'X-API-KEY': API_KEY,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const data = await response.json();
            // Апишка возвращает разные значения, для нормализации делаем одинаковые ключи в объекте 
            const normalizedItems = (data.items || []).map(item => ({
                filmId: item.kinopoiskId,      
                nameRu: item.nameRu,
                rating: item.ratingKinopoisk,
                posterUrlPreview: item.posterUrlPreview,
                year: item.year,
            }))

            setFamilyFilms({...data,items:normalizedItems});
            setPageFamilyTop(data.totalPages || validPage);

        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }

    }, [])



    return { films, loading, error, fetchTopFilms, pageCurrent, searchFilms, fullInfoFilm, currentFilm, filmTrailer, trailerFilm, relatedMovies, fanArt, getFamilyFilms, familyFilms, pageFamilyTop, setPageFamilyTop ,setCurrentFilm }
}