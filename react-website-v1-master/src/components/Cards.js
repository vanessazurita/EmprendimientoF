import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import triviaImage from '../images/trivia.jpeg'; // Importa las imágenes desde src
import simuladorImage from '../images/simulador.jpg'; // Importa las imágenes desde src

function Cards() {
  return (
    <div className="cards">
      {/* Información sobre la gamificación */}
      <div className="info">
        <h1 className="info__title">¿Qué es la Gamificación y Cómo Mejora el Aprendizaje?</h1>
        <p className="info__text">
          La <strong>gamificación</strong> es la incorporación de elementos de juego, como recompensas, niveles, y desafíos, en entornos no lúdicos. En el ámbito educativo, se utiliza para hacer que el aprendizaje sea más interactivo, atractivo y motivador.
        </p>
        <p className="info__text">
          Los beneficios son claros: los estudiantes se sienten más motivados y comprometidos, lo que mejora la retención de información, el trabajo en equipo y el desarrollo de habilidades como la resolución de problemas. ¡Aprender se convierte en un juego emocionante!
        </p>
      </div>

      {/* Título de las tarjetas */}
      <h1>¡Explora el Conocimiento a través de Juegos y Simuladores!</h1>

      {/* Contenedor de las tarjetas */}
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src={triviaImage} // Utiliza la imagen importada
              text="Desafía tus conocimientos con nuestra trivia educativa 🤓"
              label="Trivia"
              path="/trivia"
            />
            <CardItem
              src={simuladorImage} // Utiliza la imagen importada
              text="Explora conceptos interactivos y aprende de manera práctica con simuladores 🤖🚀"
              label="Simuladores"
              path="/simuladores"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
