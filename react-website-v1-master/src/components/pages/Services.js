import React from 'react';
import '../../App.css';
import CardItem from '../CardItem';
import Footer from '../Footer';
import img1 from '../../images/mate.jpg';
import img2 from '../../images/fisica.png';
import img3 from '../../images/quimica.jpg';
import img4 from '../../images/biologia.png';

export default function Services() {
  return (
    <div className="services">
      <h1 className="services-title">SIMULADORES</h1>
      <div className="services__container">
        <div className="services__wrapper">
          <ul className="services__items">
            <CardItem
              src={img1}
              text="¡Explora el fascinante mundo de las matemáticas! 📐"
              label="Matemáticas"
              path="https://phet.colorado.edu/es/simulations/filter?subjects=math-and-statistics&type=html"
              external
            />
            <CardItem
              src={img2}
              text="Descubre las leyes de la física de forma interactiva! ⚛️"
              label="Física"
              path="https://phet.colorado.edu/es/simulations/filter?subjects=physics&type=html"
              external
            />
          </ul>
          <ul className="services__items">
            <CardItem
              src={img3}
              text="Aprende sobre reacciones químicas y más 🔬"
              label="Química"
              path="https://phet.colorado.edu/es/simulations/filter?subjects=chemistry&type=html"
              external
            />
            <CardItem
              src={img4}
              text="Explora la biología desde un enfoque práctico 🌱"
              label="Biología"
              path="https://phet.colorado.edu/es/simulations/filter?subjects=biology&type=html"
              external
            />
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}
