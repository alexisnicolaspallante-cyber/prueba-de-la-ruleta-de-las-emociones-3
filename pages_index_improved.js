import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { emotions } from '../data/emotions';
import { useApp } from '../context/AppContext';
import { useSound } from '../hooks/useSound';
import EmotionWheel from '../components/EmotionWheel';
import EmotionResult from '../components/EmotionResult';
import HistoryPanel from '../components/HistoryPanel';
import StatsPanel from '../components/StatsPanel';
import AchievementsPanel from '../components/AchievementsPanel';
import DailyChallenge from '../components/DailyChallenge';
import ThemeToggle from '../components/ThemeToggle';
import SoundControl from '../components/SoundControl';
import styles from '../styles/Home.module.css';

export default function Home() {
  const {
    userStats,
    currentEmotion,
    dailyChallenge,
    recordSpin,
    settings
  } = useApp();
  
  const { playSound } = useSound();
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [activePanel, setActivePanel] = useState(null); // 'history', 'stats', 'achievements'
  const [showTutorial, setShowTutorial] = useState(false);

  // Mostrar tutorial solo la primera vez
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial && userStats.totalSpins === 0) {
      setShowTutorial(true);
    }
  }, [userStats.totalSpins]);

  const closeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  const handleSpin = () => {
    if (isSpinning) return;
    
    playSound('spin', 0.4);
    setIsSpinning(true);
    setShowResult(false);
    
    // Simular giro con duración de 3 segundos
    setTimeout(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      
      recordSpin(randomEmotion);
      setIsSpinning(false);
      setShowResult(true);
      
      playSound('result', 0.6);
      
      // Confetti si es una emoción rara
      if (randomEmotion.rarity === 'rare' || randomEmotion.rarity === 'legendary') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      // Confetti extra si completó el desafío diario
      if (dailyChallenge && !dailyChallenge.completed && randomEmotion.id === dailyChallenge.emotion.id) {
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#FFD700', '#FFA500', '#FF6B6B']
          });
          playSound('achievement', 0.7);
        }, 500);
      }
    }, 3000);
  };

  const togglePanel = (panelName) => {
    setActivePanel(activePanel === panelName ? null : panelName);
  };

  return (
    <div className={`${styles.container} ${settings.theme === 'dark' ? styles.darkTheme : ''}`}>
      <Head>
        <title>🐕 El Emocionómetro Salchicha | Descubre Tu Emoción</title>
        <meta name="description" content="Ruleta interactiva de emociones con perros salchichas. Gira, descubre tu emoción, crea memes y colecciona logros." />
        <meta name="keywords" content="emociones, perro salchicha, dachshund, ruleta, memes, juego, diversión" />
        <meta property="og:title" content="El Emocionómetro Salchicha" />
        <meta property="og:description" content="Descubre tu emoción del día con adorables perros salchichas" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header con controles */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <motion.h1 
            className={styles.logo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            🐕 Emocionómetro
          </motion.h1>
        </div>
        
        <div className={styles.headerRight}>
          <div className={styles.levelBadge}>
            <span className={styles.levelIcon}>
              {userStats.level <= 3 ? '🐶' : userStats.level <= 6 ? '🦴' : userStats.level <= 9 ? '👑' : '✨'}
            </span>
            <span>Nivel {userStats.level}</span>
          </div>
          
          <div className={styles.pointsBadge}>
            <span>⭐</span>
            <span>{userStats.points} pts</span>
          </div>
          
          <SoundControl />
          <ThemeToggle />
          
          <button 
            className={styles.iconButton}
            onClick={() => setShowTutorial(true)}
            title="Ayuda"
          >
            ❓
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {/* Desafío diario */}
        {dailyChallenge && !dailyChallenge.completed && (
          <DailyChallenge challenge={dailyChallenge} />
        )}

        {/* Información del usuario */}
        <motion.div 
          className={styles.userInfo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.stat}>
            <span className={styles.statIcon}>🎡</span>
            <div>
              <div className={styles.statValue}>{userStats.totalSpins}</div>
              <div className={styles.statLabel}>Giros</div>
            </div>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statIcon}>🔥</span>
            <div>
              <div className={styles.statValue}>{userStats.currentStreak}</div>
              <div className={styles.statLabel}>Racha</div>
            </div>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statIcon}>📚</span>
            <div>
              <div className={styles.statValue}>{userStats.uniqueEmotions.length}/20</div>
              <div className={styles.statLabel}>Emociones</div>
            </div>
          </div>
          
          <div className={styles.stat}>
            <span className={styles.statIcon}>🏆</span>
            <div>
              <div className={styles.statValue}>{userStats.unlockedAchievements.length}</div>
              <div className={styles.statLabel}>Logros</div>
            </div>
          </div>
        </motion.div>

        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.title}>
            {isSpinning ? '🌀 Girando...' : '¡Gira la Rueda!'}
          </h2>
          <p className={styles.description}>
            {isSpinning 
              ? 'Preparando tu emoción perruna...' 
              : 'Descubre qué emoción te representa hoy'}
          </p>
        </motion.div>

        {/* Ruleta */}
        <EmotionWheel 
          emotions={emotions}
          isSpinning={isSpinning}
          onSpin={handleSpin}
        />

        {/* Resultado */}
        <AnimatePresence>
          {showResult && currentEmotion && (
            <EmotionResult emotion={currentEmotion} />
          )}
        </AnimatePresence>

        {/* Botones de paneles */}
        <div className={styles.panelButtons}>
          <motion.button
            className={`${styles.panelButton} ${activePanel === 'history' ? styles.active : ''}`}
            onClick={() => togglePanel('history')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📜 Historial
          </motion.button>
          
          <motion.button
            className={`${styles.panelButton} ${activePanel === 'stats' ? styles.active : ''}`}
            onClick={() => togglePanel('stats')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 Estadísticas
          </motion.button>
          
          <motion.button
            className={`${styles.panelButton} ${activePanel === 'achievements' ? styles.active : ''}`}
            onClick={() => togglePanel('achievements')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏆 Logros
            {userStats.unlockedAchievements.length > 0 && (
              <span className={styles.badge}>{userStats.unlockedAchievements.length}</span>
            )}
          </motion.button>
        </div>

        {/* Paneles */}
        <AnimatePresence>
          {activePanel === 'history' && (
            <HistoryPanel onClose={() => setActivePanel(null)} />
          )}
          {activePanel === 'stats' && (
            <StatsPanel onClose={() => setActivePanel(null)} />
          )}
          {activePanel === 'achievements' && (
            <AchievementsPanel onClose={() => setActivePanel(null)} />
          )}
        </AnimatePresence>
      </main>

      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTutorial}
          >
            <motion.div
              className={styles.tutorialModal}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>🐕 ¡Bienvenido al Emocionómetro Salchicha!</h2>
              
              <div className={styles.tutorialContent}>
                <div className={styles.tutorialStep}>
                  <span className={styles.tutorialIcon}>🎡</span>
                  <div>
                    <h3>1. Gira la Ruleta</h3>
                    <p>Presiona el botón para descubrir tu emoción del día</p>
                  </div>
                </div>
                
                <div className={styles.tutorialStep}>
                  <span className={styles.tutorialIcon}>🎨</span>
                  <div>
                    <h3>2. Crea Memes</h3>
                    <p>Genera y comparte memes graciosos de tu emoción</p>
                  </div>
                </div>
                
                <div className={styles.tutorialStep}>
                  <span className={styles.tutorialIcon}>🏆</span>
                  <div>
                    <h3>3. Colecciona Logros</h3>
                    <p>Desbloquea logros especiales y sube de nivel</p>
                  </div>
                </div>
                
                <div className={styles.tutorialStep}>
                  <span className={styles.tutorialIcon}>🎯</span>
                  <div>
                    <h3>4. Desafío Diario</h3>
                    <p>Completa el desafío del día para puntos extra</p>
                  </div>
                </div>
              </div>
              
              <button 
                className={styles.tutorialButton}
                onClick={closeTutorial}
              >
                ¡Entendido! 🐕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className={styles.footer}>
        <p>Hecho con ❤️ y mucho humor perruno</p>
        <p className={styles.footerLinks}>
          <a href="https://github.com/tu-usuario/dachshund-emotion-wheel" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' • '}
          <a href="#" onClick={(e) => { e.preventDefault(); setShowTutorial(true); }}>
            Tutorial
          </a>
          {' • '}
          <span>v2.0.0</span>
        </p>
      </footer>
    </div>
  );
}