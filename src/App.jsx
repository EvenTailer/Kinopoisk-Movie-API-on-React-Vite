import React from 'react';
import { useState, useEffect } from 'react';
import { useKinopoisk } from './hooks/useKinopoisk';
import FilmGallary from './FilmGallary';
import './style.css'
import SearchFilm from './SearchFilm';
import InfoBlock from './InfoBlock';
import YouNotes from './YouNotes';
import BurgerMenu from './BurgerMenu';
import About from './About';

function App() {
  // кастомный хук, тисто только для полуение запросов из апи
  const { films, loading, error, fetchTopFilms, pageCurrent, searchFilms, fullInfoFilm, currentFilm, filmTrailer, trailerFilm, relatedMovies, fanArt, getFamilyFilms, familyFilms, pageFamilyTop, setPageFamilyTop, setCurrentFilm } = useKinopoisk();
  const [searchQuery, setSearchQuery] = useState('')
  const [showInfoFilm, setShowInfoFilm] = useState(false);
  const [topPage, setTopPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('bookmarks');
    return saved ? JSON.parse(saved) : []
  })
  const [showFamilyTop, setShowFamilyTop] = useState(false);
  const [familyPage, setFamilyPage] = useState(1);
  const [showNotes, setShowNotes] = useState(false);
  const popularTitle = "Популярные фильмы";
  const familyTitle = "Семейные фильмы";

  // возвращение в нужный блок
  const [previousMode, setPreviousMode] = useState(null);

  // О проекте и обо мне 
  const [showAbout, setShowAbout] = useState(false);


  // открытие и закрытие бокового меню
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const backMain = () => setIsMenuOpen(false)

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setShowInfoFilm(false);
      setTopPage(1);
      fetchTopFilms(1)
    }
  }, [searchQuery, fetchTopFilms])

  useEffect(() => {
    fetchTopFilms(1);
  }, [fetchTopFilms]);


  //  обработчик страниц популярных
  const handleTopPageChange = (page) => {
    setTopPage(page);
    fetchTopFilms(page);
  };
  // Обработчик страниц семейных фильмов
  const handleFamilyPageChange = (page) => {
    setFamilyPage(page);
    getFamilyFilms(page);
  };

  //  добавляем и удаляем фильм с закладок через toggle, для просмотра не потребуется запрос так как хранится в localStorage
  function toggleNote(currentFilm) {
    setNotes(prevNotes => {
      const exists = prevNotes.some(note => note.kinopoiskId === currentFilm.kinopoiskId);
      if (exists) {
        return prevNotes.filter(note => note.kinopoiskId !== currentFilm.kinopoiskId);
      } else {
        const saveNote = {
          'coverUrl': currentFilm.coverUrl,
          'description': currentFilm.description,
          'kinopoiskHDId': currentFilm.kinopoiskHDId,
          'kinopoiskId': currentFilm.kinopoiskId,
          'nameRu': currentFilm.nameRu,
          'posterUrl': currentFilm.posterUrl,
          'posterUrlPreview': currentFilm.posterUrlPreview,
          'webUrl': currentFilm.webUrl,
          'year': currentFilm.year,
          'ratingKinopoisk': currentFilm.ratingKinopoisk,
          'filmLength': currentFilm.filmLength
        }
        setNotes([...notes, saveNote])
      }
    })



  }
// идем в закладочки
  function changeShowNotes() {
    setShowAbout(false);  
    setShowNotes(true)
    setShowInfoFilm(false)
    backMain()
  }
  //  На главную страницу 
  function goToMain() {
    setShowAbout(false);  
    setCurrentFilm(null);
    setShowNotes(false);
    setShowInfoFilm(false);
    setShowFamilyTop(false);
    setPreviousMode(null);
    backMain()

  }

  //  для показа блока информации о фильме
  function handleCardClick(id) {
    setPreviousMode('popular');
    fullInfoFilm(id);
    filmTrailer(id);
    relatedMovies(id);
    setShowInfoFilm(true);
    setShowFamilyTop(false)
  }

  // Показ блока информации семейных фильмов
  const handleFamilyCardClick = (id) => {
    setPreviousMode('family');
    fullInfoFilm(id);
    filmTrailer(id);
    relatedMovies(id);
    setShowInfoFilm(true);
    setShowFamilyTop(false);
  };
  // Показ блока информации о заметках
  const handleNoteCardClick = (id) => {
    setPreviousMode('notes');
    fullInfoFilm(id);
    filmTrailer(id);
    relatedMovies(id);
    setShowInfoFilm(true);
    setShowNotes(false);       // ← сбрасываем режим закладок
  };


  // Семейные фильмы правда функция называется немного неправильно ссорян
  function checkFetch() {
    setShowAbout(false);  
    setPreviousMode('family');
    setFamilyPage(1);
    setCurrentFilm(null);
    getFamilyFilms(1);
    getFamilyFilms(pageFamilyTop);
    setShowFamilyTop(true);
    setShowNotes(false);
    setShowInfoFilm(false);
    backMain()
  }

  // показываем страницу о проекте и обо мне Э

  function goToAbout() {
    setShowAbout(true);
    setShowNotes(false);
    setShowInfoFilm(false);
    setShowFamilyTop(false);
    setPreviousMode(null);
    backMain();
  }

  //  возврат на главную или в закладки или в семейные, зависит от того где мы были 
  function handleBackToList() {
    setShowInfoFilm(false);
    // Восстанавливаем предыдущий режим
    if (previousMode === 'family') {
      setShowFamilyTop(true);
    } else if (previousMode === 'notes') {
      setShowNotes(true);
    } else {
      // popular – ничего не делаем, главная и так активна (популярные фильмы)
      setShowFamilyTop(false);
      setShowNotes(false);
    }
    setPreviousMode(null);
  }



  if (loading) {
    return <div className="loading">Загрузка фильмов...</div>;
  }
  if (error) {
    return <div className="loading">{error}</div>;
  }



  return (<>
    <BurgerMenu
      toggleMenu={toggleMenu}
      isMenuOpen={isMenuOpen}
      goToMain={goToMain}
      changeShowNotes={changeShowNotes}
      checkFetch={checkFetch}
      goToAbout={goToAbout}
    />

    {showAbout ? (
      <About />) : (<>
      {!showInfoFilm && !showNotes && !showFamilyTop ? (<>
      <SearchFilm
        searchFilms={searchFilms}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <FilmGallary
        title={popularTitle}
        fetchTopFilms={fetchTopFilms}
        films={films}
        pageCurrent={pageCurrent}
        handleCardClick={handleCardClick}
        topPage={topPage}
        handleTopPageChange={handleTopPageChange}
      />
    </>) : (
    currentFilm && !showNotes && !showFamilyTop && (
    <InfoBlock
      handleBackToList={handleBackToList}
      currentFilm={currentFilm}
      trailerFilm={trailerFilm}
      toggleNote={toggleNote}
      notes={notes}
      fanArt={fanArt}
      handleCardClick={handleCardClick}
      relatedMovies={relatedMovies}
    />
    )
    )
    }
    {showNotes && notes.length !== 0 && (
      <YouNotes
        notes={notes}
        searchQuery={searchQuery}
        handleCardClick={handleNoteCardClick}
        setNotes={setNotes}
      />
    )}

    {showFamilyTop && !showNotes && !showInfoFilm && (
      <FilmGallary
        title={familyTitle}
        fetchTopFilms={getFamilyFilms}
        films={familyFilms.items}
        pageCurrent={pageFamilyTop}
        handleCardClick={handleFamilyCardClick}
        topPage={familyPage}
        handleTopPageChange={handleFamilyPageChange}
      />
    )}
     </> )}


    {isMenuOpen && <div className="overlay" onClick={backMain}></div>}


  </>
  )




}

export default App;