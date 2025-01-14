import React from 'react';
import { useHistory } from 'react-router-dom';  // Importa el hook useHistory
import '../App.css';
import './HeroSection.css';

function HeroSection() {
  const history = useHistory();  // Inicializa el hook history

  const handleStartGame = () => {
    history.push('/products');  // Redirige a la página de Products
  };

  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>GAMIFICACIÓN</h1>
      <p>¿Estás listo para aprender jugando con trivia?</p>
      <div className='hero-btns'>
        <button className='btn' onClick={handleStartGame}>Comenzar Juego</button>
        <button className='btn'>Ver Tutorial</button>
      </div>
    </div>
  );
}

export default HeroSection;
