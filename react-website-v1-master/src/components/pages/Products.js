import React, { useState, useEffect } from 'react';
import './Trivia.css';

const topics = {
  movimiento: {
    title: "Movimiento",
    concept: "Estudia cómo los objetos cambian de posición en el tiempo, describiendo su posición, velocidad y aceleración. La cinemática se centra en el movimiento sin considerar fuerzas, mientras que la dinámica explica cómo las fuerzas afectan el movimiento (según las leyes de Newton).",
    subtopics: [
      "Conceptos básicos de cinemática",
      "Dinámica"
    ],
    simulatorLink: "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_all.html?locale=es"  // Agregado el enlace
  },
  fuerzas: {
    title: "Fuerzas",
    concept: "Son interacciones que cambian el movimiento de los objetos. Incluyen la gravitación, la fricción y la tensión. Además, se analiza cómo las fuerzas afectan el equilibrio o el movimiento de los sistemas.",
    subtopics: [
      "Tipos de fuerzas",
      "Análisis de sistemas en equilibrio y movimiento"
    ]
  },
  trabajoEnergia: {
    title: "Trabajo y energía",
    concept: "El trabajo es la transferencia de energía a través de una fuerza. La energía puede ser cinética (por movimiento) o potencial (por posición), y su conservación implica que la energía total en un sistema cerrado no cambia, solo se transforma.",
    subtopics: [
      "Energía cinética",
      "Potencial",
      "Trabajo",
      "Conservación de la energía"
    ]
  },
  mecanica: {
    title: "Mecánica",
    concept: "Se divide en estática, que estudia objetos en reposo o equilibrio, y dinámica de rotación, que examina el movimiento de objetos que giran, usando conceptos como el momento angular y el torque.",
    subtopics: [
      "Estática",
      "Dinámica de rotación"
    ]
  }
};

const questionBank = {
  movimiento: [
    {
      id: "mov1_1",
      topic: "Movimiento Pregunta 1",
      question: "Si un objeto se mueve a una velocidad constante de 10 m/s, ¿cuánto tiempo tardará en recorrer 50 metros?",
      options: ["5 s", "10 s", "15 s", "20 s"],
      correctAnswer: 0,
      explanation: "El tiempo se calcula con t = d/v = 50/10 = 5 s."
    },
    {
      id: "mov1_2",
      topic: "Movimiento Pregunta 2",
      question: "Un coche acelera uniformemente desde el reposo hasta 20 m/s en 5 segundos. ¿Cuál es su aceleración?",
      options: ["2 m/s²", "4 m/s²", "6 m/s²", "8 m/s²"],
      correctAnswer: 1,
      explanation: "La aceleración se calcula con a = (v - u)/t = (20 - 0)/5 = 4 m/s²."
    },
    {
      id: "mov1_3",
      topic: "Movimiento Pregunta 3",
      question: "¿Cuál es la velocidad final de un objeto que acelera a 3 m/s² durante 4 segundos desde el reposo?",
      options: ["12 m/s", "16 m/s", "20 m/s", "24 m/s"],
      correctAnswer: 0,
      explanation: "v = u + at = 0 + 3 × 4 = 12 m/s."
    },
  ],
  fuerzas: [
    {
      id: "for2_1",
      topic: "Fuerzas",
      question: "Si una fuerza de 10 N actúa sobre un objeto de 2 kg, ¿cuál será su aceleración?",
      options: ["2 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"],
      correctAnswer: 1,
      explanation: "a = F/m = 10/2 = 5 m/s²."
    },
  ],
  trabajoEnergia: [
    {
      id: "trab3_1",
      topic: "Trabajo y energía",
      question: "Si una fuerza de 10 N mueve un objeto 5 m en la misma dirección, ¿cuánto trabajo realiza?",
      options: ["10 J", "25 J", "50 J", "100 J"],
      correctAnswer: 2,
      explanation: "Trabajo = Fuerza × Distancia = 10 × 5 = 50 J."
    },
  ],
  mecanica: [
    {
      id: "mec4_1",
      topic: "Mecánica",
      question: "Un cuerpo de 5 kg está suspendido por dos cuerdas que forman ángulos de 45° con la horizontal. ¿Cuál es la tensión en cada cuerda? (g = 9.8 m/s²)",
      options: ["34.6 N", "49 N", "69.3 N", "98 N"],
      correctAnswer: 0,
      explanation: "La tensión en cada cuerda es T = (m·g) / (2·sin(45)) ≈ 34.6 N."
    },
  ],
};

export default function PhysicsTrivia() {
  const [gameState, setGameState] = useState('topics'); // topics, questions, results
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(60);
  const [xp, setXp] = useState(0);
  const [score, setScore] = useState(0);
  const [explanation, setExplanation] = useState(null);  // Estado para explicación
  const [questionAnswered, setQuestionAnswered] = useState(false); // Estado para marcar si ya se respondió una pregunta

  useEffect(() => {
    let interval;
    if (gameState === 'questions' && timer > 0 && !questionAnswered) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleTimeUp();
    }
    return () => clearInterval(interval);
  }, [timer, gameState, questionAnswered]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setGameState('description'); // Cambiar al estado de ver la descripción
  };

  const handleStartQuiz = () => {
    setGameState('questions'); // Iniciar preguntas
    resetGameState();
  };

  const handleAnswerSelect = (answerIndex) => {
    const currentQuestion = questionBank[selectedTopic][currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
  
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerIndex
    }));
  
    if (isCorrect) {
      setScore(prev => prev + 100);
      setXp(prev => prev + 10);
      setExplanation("¡Correcto!");  // Explicación para la respuesta correcta
    } else {
      setLives(prev => prev - 1);
      setExplanation(`¡Incorrecto! La respuesta correcta es: ${currentQuestion.options[currentQuestion.correctAnswer]}. ${currentQuestion.explanation}`);
    }
  
    setQuestionAnswered(true); // Marca la pregunta como respondida
  };
  

  const handleTimeUp = () => {
    setLives(prev => prev - 1);
    if (lives > 1) {
      setTimer(60);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState('results');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionBank[selectedTopic].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(60);
      setQuestionAnswered(false);  // Resetea el estado de la pregunta
      setExplanation(null);  // Limpiar la explicación antes de la siguiente pregunta
    } else {
      setGameState('results');  // Si no hay más preguntas, mostrar resultados
    }
  };

  const resetGameState = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setLives(3);
    setTimer(60);
    setScore(0);
    setXp(0);
    setExplanation(null);
    setQuestionAnswered(false);  // Reiniciar estado de respuesta
  };

  const renderTopics = () => (
    <div className="topics-container">
      <h2>Selecciona un tema de Física</h2>
      <div className="grid-container">
        {Object.entries(topics).map(([key, topic]) => (
          <div key={key} className="topic-card" onClick={() => handleTopicSelect(key)}>
            <h3>{topic.title}</h3>
            <ul>
              {topic.subtopics.map((subtopic, index) => (
                <li key={index}>{subtopic}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTopicDescription = () => {
    const topic = topics[selectedTopic];
    return (
      <div className="topic-description">
        <h2>{topic.title}</h2>
        <p>{topic.concept}</p>
        <h4>Subtemas:</h4>
        <ul>
          {topic.subtopics.map((subtopic, index) => (
            <li key={index}>{subtopic}</li>
          ))}
        </ul>
        <button onClick={handleStartQuiz}>Comenzar preguntas</button>
      </div>
    );
  };

  const renderQuestion = () => {
    const currentQuestion = questionBank[selectedTopic][currentQuestionIndex];
    return (
      <div className="question-container">
        <div className="stats">
          <span className="heart">{'❤️'.repeat(lives)}</span>
          <span className="timer">⏱️ {timer}s</span>
          <span>XP: {xp}</span>
        </div>
        <h3 className="question-topic">{currentQuestion.topic}</h3>
        <p>{currentQuestion.question}</p>
        <div className="answer-options">
          {currentQuestion.options.map((option, index) => (
            <button key={index} onClick={() => handleAnswerSelect(index)}>
              {option}
            </button>
          ))}
        </div>
  
        {/* Aquí se muestra la explicación inmediatamente después de seleccionar la respuesta */}
        {explanation && (
          <div className="explanation">
            <h4>Explicación:</h4>
            <p>{explanation}</p>
          </div>
        )}
  
        {/* Botón para avanzar a la siguiente pregunta con la clase next-button */}
        {questionAnswered && (
          <button className="next-button" onClick={handleNextQuestion}>Siguiente pregunta</button>
        )}
      </div>
    );
  };
  
  

  const renderResults = () => (
    <div className="result-container">
      <h3>¡Juego Terminado!</h3>
      <p>Puntuación: {score}</p>
      <p>XP ganado: {xp}</p>
      <button onClick={() => {
        setGameState('topics');
        resetGameState();
      }}>Jugar de nuevo</button>
    </div>
  );

  return (
    <div className="container">
      <header>
        <h1>Trivia de Física</h1>
      </header>
      {gameState === 'topics' && renderTopics()}
      {gameState === 'description' && renderTopicDescription()}
      {gameState === 'questions' && renderQuestion()}
      {gameState === 'results' && renderResults()}
    </div>
  );
}
