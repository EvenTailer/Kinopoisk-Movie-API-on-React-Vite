import React from "react";

function BurgerMenu({toggleMenu,isMenuOpen,goToMain,changeShowNotes,checkFetch,goToAbout}){

    return(<>
    <button
      className='burger-button'
      onClick={toggleMenu}
    >
      ☰
    </button>
    <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
      <ul>
        <li onClick={() => goToMain()}>Главная</li>
        <li onClick={() => changeShowNotes()}>Закладки</li>
        <li onClick={() => checkFetch()}>Семейные фильмы</li>
        <li onClick={()=>goToAbout() }>О проекте</li>
      </ul>
    </div>
    </>)
}

export default BurgerMenu;