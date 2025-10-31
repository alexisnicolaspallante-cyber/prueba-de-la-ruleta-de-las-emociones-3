import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useSound } from '../hooks/useSound';
import MemeGenerator from './MemeGenerator';
import ShareButtons from './ShareButtons';
import { rarityInfo } from '../data/emotions';
import styles from '../styles/EmotionResult.module.css';

export default function EmotionResult({ emotion }) {
  const { toggleFavorite, userStats, recordMeme } = useApp();
  const { playSound } = useSound();
  const [showMeme, setShowMeme] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const isFavorite = userStats.favorites.includes(emotion.id);
  const rarity = rarityInfo[emotion.rarity];

  const handleFavorite = () => {
    toggleFavorite(emotion.id);
    playSound('click', 0.3);
  };

  const handleCreateMeme = () => {
    setShowMeme(!showMeme);
    if (!showMeme) {
      recordMeme();
      playSound('success', 0.4);
    }
  };

  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
    playSound('click', 0.3);
  };

  return (
    <motion.div
      className={styles.resultContainer}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className={styles.resultCard}>
        {/* Header con título y rareza */}
        <div className={styles.resultHeader}>
          <motion.h2
            className={styles.resultTitle}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.emoji}>{emotion.emoji}</span>
            {emotion.name}
          </motion.h2>
          
          <motion.div
            className={styles.rarityBadge}
            style={{ 
              backgroundColor: rarity.color,
              boxShadow: `0 0 15px ${rarity.color}50`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {rarity.name}
          </motion.div>
        </div>

        {/* Puntos ganados */}
        <motion.div
          className={styles.pointsEarned}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className={styles.pointsIcon}>⭐</span>
          <span>+{emotion.points} puntos</span>
          <span className={styles.pointsMultiplier}>
            (x{rarity.multiplier})
          </span>
        </motion.div>

        {/* Imagen/Visualización de la emoción */}
        <motion.div
          className={styles.emotionDisplay}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div 
            className={styles.emotionImage}
            style={{
              background: `linear-gradient(135deg, ${emotion.color}dd 0%, ${emotion.color}88 100%)`
            }}
          >
            <div className={styles.emotionImageContent}>
              <span className={styles.bigEmoji}>{emotion.emoji}</span>
              <div className={styles.categoryBadge}>
                {emotion.category}
              </div>
            </div>
          </div>

          {/* Botón de favorito */}
          <motion.button
            className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
            onClick={handleFavorite}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isFavorite ? '❤️' : '🤍'}
          </motion.button>
        </motion.div>

        {/* Descripción */}
        <motion.div
          className={styles.emotionInfo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>📖 Descripción</h3>
            <p className={styles.description}>{emotion.description}</p>
            {emotion.longDescription && (
              <p className={styles.longDescription}>{emotion.longDescription}</p>
            )}
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>🎯 Consejo del Perro Salchicha</h3>
            <div className={styles.advice}>
              <span className={styles.adviceIcon}>💡</span>
              <p>{emotion.advice}</p>
            </div>
          </div>

          {/* Tips adicionales */}
          {emotion.tips && emotion.tips.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>💭 Tips Adicionales</h3>
              <ul className={styles.tipsList}>
                {emotion.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <span className={styles.tipBullet}>🐾</span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Intensidad de la emoción */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>⚡ Intensidad</h3>
            <div className={styles.intensityBar}>
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`${styles.intensityDot} ${i < emotion.intensity ? styles.active : ''}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  style={{
                    backgroundColor: i < emotion.intensity ? emotion.color : '#e0e0e0'
                  }}
                />
              ))}
            </div>
            <p className={styles.intensityValue}>{emotion.intensity}/10</p>
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          className={styles.actionButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <motion.button
            className={`${styles.actionButton} ${styles.memeButton}`}
            onClick={handleCreateMeme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.buttonIcon}>
              {showMeme ? '✖️' : '🎨'}
            </span>
            <span>{showMeme ? 'Cerrar Meme' : 'Crear Meme'}</span>
          </motion.button>

          <motion.button
            className={`${styles.actionButton} ${styles.shareButton}`}
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.buttonIcon}>📤</span>
            <span>Compartir</span>
          </motion.button>
        </motion.div>

        {/* Generador de memes */}
        {showMeme && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <MemeGenerator emotion={emotion} />
          </motion.div>
        )}

        {/* Opciones de compartir */}
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ShareButtons emotion={emotion} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}