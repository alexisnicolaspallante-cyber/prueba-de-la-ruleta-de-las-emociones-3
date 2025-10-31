import { motion } from 'framer-motion';
import styles from '../styles/EmotionWheel.module.css';

export default function EmotionWheel({ emotions, isSpinning, onSpin }) {
  const segmentAngle = 360 / emotions.length;

  return (
    <div className={styles.wheelContainer}>
      {/* Contenedor de la ruleta con animación */}
      <motion.div
        className={styles.wheelWrapper}
        animate={isSpinning ? {
          rotate: [0, 1800 + Math.random() * 360]
        } : {}}
        transition={{
          duration: 3,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
      >
        <div className={styles.wheel}>
          {emotions.map((emotion, index) => {
            const angle = index * segmentAngle;
            const skewY = segmentAngle - 90;
            
            return (
              <div
                key={emotion.id}
                className={styles.segment}
                style={{
                  transform: `rotate(${angle}deg) skewY(${skewY}deg)`,
                  backgroundColor: emotion.color
                }}
              >
                <div 
                  className={styles.segmentContent}
                  style={{ 
                    transform: `skewY(${-skewY}deg) rotate(${segmentAngle/2}deg)` 
                  }}
                >
                  <span className={styles.emotionEmoji}>{emotion.emoji}</span>
                  <span className={styles.emotionName}>{emotion.name}</span>
                </div>
              </div>
            );
          })}
          
          {/* Centro de la ruleta */}
          <div className={styles.center}>
            <div className={styles.centerInner}>
              <motion.span
                className={styles.centerEmoji}
                animate={isSpinning ? {
                  rotate: 360,
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 0.5, repeat: Infinity }
                }}
              >
                🐕
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Indicador/Flecha */}
      <div className={styles.indicator}>
        <motion.div
          className={styles.arrow}
          animate={isSpinning ? {
            y: [0, -5, 0]
          } : {}}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          ▼
        </motion.div>
      </div>

      {/* Botón de girar */}
      <motion.button
        className={`${styles.spinButton} ${isSpinning ? styles.spinning : ''}`}
        onClick={onSpin}
        disabled={isSpinning}
        whileHover={!isSpinning ? { scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" } : {}}
        whileTap={!isSpinning ? { scale: 0.95 } : {}}
        animate={isSpinning ? {
          boxShadow: [
            "0 4px 15px rgba(255,107,107,0.3)",
            "0 4px 25px rgba(255,107,107,0.6)",
            "0 4px 15px rgba(255,107,107,0.3)"
          ]
        } : {}}
        transition={{
          boxShadow: { duration: 1, repeat: Infinity }
        }}
      >
        {isSpinning ? (
          <span className={styles.spinningText}>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Girando
            </motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            >
              ...
            </motion.span>
          </span>
        ) : (
          <>
            <span className={styles.buttonIcon}>🎡</span>
            <span>¡Girar la Rueda!</span>
          </>
        )}
      </motion.button>

      {/* Decoraciones alrededor de la ruleta */}
      <motion.div
        className={styles.decoration}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className={styles.decorationDot}
            style={{
              transform: `rotate(${i * 45}deg) translateY(-180px)`
            }}
          >
            ✨
          </span>
        ))}
      </motion.div>
    </div>
  );
}