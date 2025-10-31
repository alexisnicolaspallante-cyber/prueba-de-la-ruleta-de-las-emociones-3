import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useSound } from '../hooks/useSound';
import styles from '../styles/ShareButtons.module.css';

export default function ShareButtons({ emotion }) {
  const { recordShare } = useApp();
  const { playSound } = useSound();

  const shareUrl = typeof window !== 'undefined' 
    ? window.location.href 
    : 'https://emocionometro-salchicha.vercel.app';
  
  const shareText = `¡Mi emoción es: ${emotion.name}! ${emotion.emoji} - ${emotion.description}`;

  const handleShare = (platform) => {
    playSound('click', 0.3);
    recordShare();

    let url = '';
    
    switch(platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=EmocionometroSalchicha,PerroSalchicha`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'reddit':
        url = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  const copyLink = () => {
    playSound('success', 0.4);
    navigator.clipboard.writeText(shareUrl);
    alert('¡Enlace copiado al portapapeles! 📋');
    recordShare();
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'El Emocionómetro Salchicha',
          text: shareText,
          url: shareUrl,
        });
        recordShare();
        playSound('success', 0.4);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyLink();
    }
  };

  const socialButtons = [
    { name: 'twitter', icon: '🐦', label: 'Twitter', color: '#1DA1F2' },
    { name: 'facebook', icon: '📘', label: 'Facebook', color: '#4267B2' },
    { name: 'whatsapp', icon: '💬', label: 'WhatsApp', color: '#25D366' },
    { name: 'telegram', icon: '✈️', label: 'Telegram', color: '#0088cc' },
    { name: 'linkedin', icon: '💼', label: 'LinkedIn', color: '#0077b5' },
    { name: 'reddit', icon: '🤖', label: 'Reddit', color: '#FF4500' }
  ];

  return (
    <motion.div
      className={styles.shareContainer}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <h3 className={styles.shareTitle}>📤 Compartir en Redes Sociales</h3>
      
      <div className={styles.shareGrid}>
        {socialButtons.map((social, index) => (
          <motion.button
            key={social.name}
            className={styles.shareButton}
            style={{ 
              backgroundColor: social.color,
              borderColor: social.color 
            }}
            onClick={() => handleShare(social.name)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.shareIcon}>{social.icon}</span>
            <span className={styles.shareLabel}>{social.label}</span>
          </motion.button>
        ))}
      </div>

      <div className={styles.utilityButtons}>
        {navigator.share && (
          <motion.button
            className={styles.utilityButton}
            onClick={shareNative}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>📱</span>
            <span>Compartir (Nativo)</span>
          </motion.button>
        )}

        <motion.button
          className={styles.utilityButton}
          onClick={copyLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>🔗</span>
          <span>Copiar Enlace</span>
        </motion.button>
      </div>

      <div className={styles.shareInfo}>
        <p className={styles.infoText}>
          💡 Comparte tu emoción con amigos y ayúdalos a descubrir la suya
        </p>
        <div className={styles.shareCount}>
          <span className={styles.countIcon}>📊</span>
          <span>Has compartido {useApp().userStats.totalShares} veces</span>
        </div>
      </div>
    </motion.div>
  );
}