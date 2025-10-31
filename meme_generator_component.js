import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useSound } from '../hooks/useSound';
import styles from '../styles/MemeGenerator.module.css';

export default function MemeGenerator({ emotion }) {
  const canvasRef = useRef(null);
  const { recordMeme } = useApp();
  const { playSound } = useSound();
  
  const [topText, setTopText] = useState('CUANDO');
  const [bottomText, setBottomText] = useState(emotion.memeText);
  const [memeStyle, setMemeStyle] = useState('classic'); // classic, modern, minimal
  const [textSize, setTextSize] = useState('medium');
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    generateMeme();
  }, [emotion, topText, bottomText, memeStyle, textSize]);

  const generateMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = 600;
    const height = 600;
    
    canvas.width = width;
    canvas.height = height;

    // Fondo con gradiente
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, emotion.color + 'dd');
    gradient.addColorStop(1, emotion.color + '88');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Agregar patrón de perros salchichas (opcional)
    if (memeStyle === 'modern') {
      ctx.globalAlpha = 0.1;
      ctx.font = '80px Arial';
      ctx.fillStyle = '#000';
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          ctx.fillText('🐕', i * 120 + 20, j * 120 + 80);
        }
      }
      ctx.globalAlpha = 1;
    }

    // Emoji grande en el centro
    ctx.font = memeStyle === 'minimal' ? '180px Arial' : '150px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emotion.emoji, width / 2, height / 2);

    // Función para dibujar texto con outline
    const drawText = (text, x, y, fontSize) => {
      ctx.font = `bold ${fontSize}px Impact, Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Outline negro
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 8;
      ctx.strokeText(text, x, y);
      
      // Texto blanco
      ctx.fillStyle = '#FFF';
      ctx.fillText(text, x, y);
    };

    // Tamaños de texto
    const sizes = {
      small: 40,
      medium: 50,
      large: 60
    };
    const fontSize = sizes[textSize];

    // Texto superior
    if (topText) {
      // Dividir en líneas si es muy largo
      const words = topText.split(' ');
      const maxWidth = width - 40;
      let lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        ctx.font = `bold ${fontSize}px Impact, Arial`;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);

      lines.forEach((line, index) => {
        const y = 60 + (index * (fontSize + 10));
        drawText(line, width / 2, y, fontSize);
      });
    }

    // Texto inferior
    if (bottomText) {
      const words = bottomText.split(' ');
      const maxWidth = width - 40;
      let lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        ctx.font = `bold ${fontSize}px Impact, Arial`;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);

      lines.reverse().forEach((line, index) => {
        const y = height - 60 - (index * (fontSize + 10));
        drawText(line, width / 2, y, fontSize);
      });
    }

    // Marca de agua
    if (memeStyle !== 'minimal') {
      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.textAlign = 'right';
      ctx.fillText('🐕 Emocionómetro Salchicha', width - 10, height - 10);
    }
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `emocion-${emotion.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    playSound('success', 0.5);
    recordMeme();
  };

  const copyToClipboard = async () => {
    try {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          alert('¡Meme copiado al portapapeles! 🎉');
          playSound('success', 0.5);
        } catch (err) {
          console.error('Error al copiar:', err);
          alert('No se pudo copiar. Usa el botón de descargar.');
        }
      });
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const shareOnSocial = (platform) => {
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL('image/png');
    
    // En una app real, aquí subirías la imagen a un servidor
    // y obtendrías una URL pública
    alert(`Compartiendo en ${platform}... (funcionalidad demo)`);
    playSound('click', 0.3);
  };

  return (
    <motion.div
      className={styles.memeContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.memeHeader}>
        <h3 className={styles.memeTitle}>🎨 Generador de Memes</h3>
        <button
          className={styles.toggleButton}
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? '▼' : '▶'}
        </button>
      </div>

      {showControls && (
        <div className={styles.controls}>
          {/* Input texto superior */}
          <div className={styles.inputGroup}>
            <label>Texto Superior:</label>
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value.toUpperCase())}
              maxLength={50}
              placeholder="TEXTO SUPERIOR"
            />
          </div>

          {/* Input texto inferior */}
          <div className={styles.inputGroup}>
            <label>Texto Inferior:</label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value.toUpperCase())}
              maxLength={50}
              placeholder="TEXTO INFERIOR"
            />
          </div>

          {/* Selector de estilo */}
          <div className={styles.inputGroup}>
            <label>Estilo:</label>
            <div className={styles.styleButtons}>
              <button
                className={`${styles.styleButton} ${memeStyle === 'classic' ? styles.active : ''}`}
                onClick={() => setMemeStyle('classic')}
              >
                Clásico
              </button>
              <button
                className={`${styles.styleButton} ${memeStyle === 'modern' ? styles.active : ''}`}
                onClick={() => setMemeStyle('modern')}
              >
                Moderno
              </button>
              <button
                className={`${styles.styleButton} ${memeStyle === 'minimal' ? styles.active : ''}`}
                onClick={() => setMemeStyle('minimal')}
              >
                Minimal
              </button>
            </div>
          </div>

          {/* Selector de tamaño de texto */}
          <div className={styles.inputGroup}>
            <label>Tamaño de Texto:</label>
            <div className={styles.styleButtons}>
              <button
                className={`${styles.styleButton} ${textSize === 'small' ? styles.active : ''}`}
                onClick={() => setTextSize('small')}
              >
                Pequeño
              </button>
              <button
                className={`${styles.styleButton} ${textSize === 'medium' ? styles.active : ''}`}
                onClick={() => setTextSize('medium')}
              >
                Mediano
              </button>
              <button
                className={`${styles.styleButton} ${textSize === 'large' ? styles.active : ''}`}
                onClick={() => setTextSize('large')}
              >
                Grande
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Canvas del meme */}
      <div className={styles.canvasContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      {/* Botones de acción */}
      <div className={styles.memeActions}>
        <motion.button
          className={`${styles.actionBtn} ${styles.downloadBtn}`}
          onClick={downloadMeme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>📥</span>
          Descargar
        </motion.button>

        <motion.button
          className={`${styles.actionBtn} ${styles.copyBtn}`}
          onClick={copyToClipboard}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>📋</span>
          Copiar
        </motion.button>

        <motion.button
          className={`${styles.actionBtn} ${styles.shareBtn}`}
          onClick={() => shareOnSocial('Twitter')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>🐦</span>
          Twitter
        </motion.button>

        <motion.button
          className={`${styles.actionBtn} ${styles.shareBtn}`}
          onClick={() => shareOnSocial('WhatsApp')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>💬</span>
          WhatsApp
        </motion.button>
      </div>

      <p className={styles.tip}>
        💡 Tip: Personaliza el meme editando los textos arriba
      </p>
    </motion.div>
  );
}