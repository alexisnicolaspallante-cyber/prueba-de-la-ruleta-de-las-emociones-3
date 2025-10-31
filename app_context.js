import { createContext, useContext, useState, useEffect } from 'react';
import { achievements, getUserLevel } from '../data/achievements';
import { emotions } from '../data/emotions';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Estados principales
  const [userStats, setUserStats] = useState({
    totalSpins: 0,
    totalMemes: 0,
    uniqueEmotions: [],
    emotionHistory: [],
    favorites: [],
    totalShares: 0,
    dailyChallengesCompleted: 0,
    themeChanges: 0,
    firstSpinDate: null,
    lastSpinDate: null,
    currentStreak: 0,
    longestStreak: 0,
    points: 0,
    level: 1,
    unlockedAchievements: []
  });

  const [settings, setSettings] = useState({
    soundEnabled: true,
    theme: 'light',
    language: 'es',
    showAnimations: true,
    showTips: true
  });

  const [currentEmotion, setCurrentEmotion] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState(null);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedStats = localStorage.getItem('userStats');
    const savedSettings = localStorage.getItem('settings');
    const savedDailyChallenge = localStorage.getItem('dailyChallenge');

    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    if (savedDailyChallenge) {
      const challenge = JSON.parse(savedDailyChallenge);
      // Verificar si es el mismo día
      const today = new Date().toDateString();
      if (challenge.date === today) {
        setDailyChallenge(challenge);
      } else {
        generateDailyChallenge();
      }
    } else {
      generateDailyChallenge();
    }
  }, []);

  // Guardar en localStorage cuando cambien los datos
  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (dailyChallenge) {
      localStorage.setItem('dailyChallenge', JSON.stringify(dailyChallenge));
    }
  }, [dailyChallenge]);

  // Generar desafío diario
  const generateDailyChallenge = () => {
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const today = new Date().toDateString();
    
    const challenge = {
      emotion: randomEmotion,
      date: today,
      completed: false,
      bonusPoints: randomEmotion.points * 2
    };
    
    setDailyChallenge(challenge);
  };

  // Registrar un giro
  const recordSpin = (emotion) => {
    const now = new Date();
    const today = now.toDateString();
    
    setUserStats(prev => {
      const newStats = { ...prev };
      
      // Incrementar giros totales
      newStats.totalSpins += 1;
      
      // Actualizar historial
      newStats.emotionHistory = [
        {
          emotion,
          timestamp: now.toISOString(),
          date: today
        },
        ...prev.emotionHistory
      ].slice(0, 100); // Mantener solo los últimos 100
      
      // Actualizar emociones únicas
      if (!prev.uniqueEmotions.includes(emotion.id)) {
        newStats.uniqueEmotions = [...prev.uniqueEmotions, emotion.id];
      }
      
      // Actualizar fechas
      if (!prev.firstSpinDate) {
        newStats.firstSpinDate = now.toISOString();
      }
      newStats.lastSpinDate = now.toISOString();
      
      // Calcular racha
      if (prev.lastSpinDate) {
        const lastDate = new Date(prev.lastSpinDate).toDateString();
        if (lastDate === today) {
          // Mismo día, no cambiar racha
          newStats.currentStreak = prev.currentStreak;
        } else {
          const yesterday = new Date(now);
          yesterday.setDate(yesterday.getDate() - 1);
          if (lastDate === yesterday.toDateString()) {
            // Día consecutivo
            newStats.currentStreak = prev.currentStreak + 1;
            newStats.longestStreak = Math.max(newStats.currentStreak, prev.longestStreak);
          } else {
            // Se rompió la racha
            newStats.currentStreak = 1;
          }
        }
      } else {
        newStats.currentStreak = 1;
      }
      
      // Añadir puntos
      newStats.points += emotion.points;
      
      // Actualizar nivel
      const level = getUserLevel(newStats.points);
      newStats.level = level.level;
      
      // Verificar desafío diario
      if (dailyChallenge && !dailyChallenge.completed && emotion.id === dailyChallenge.emotion.id) {
        setDailyChallenge(prev => ({ ...prev, completed: true }));
        newStats.dailyChallengesCompleted += 1;
        newStats.points += dailyChallenge.bonusPoints;
      }
      
      return newStats;
    });
    
    setCurrentEmotion(emotion);
    checkAchievements();
  };

  // Registrar creación de meme
  const recordMeme = () => {
    setUserStats(prev => ({
      ...prev,
      totalMemes: prev.totalMemes + 1,
      points: prev.points + 5
    }));
    checkAchievements();
  };

  // Registrar compartir
  const recordShare = () => {
    setUserStats(prev => ({
      ...prev,
      totalShares: prev.totalShares + 1,
      points: prev.points + 10
    }));
    checkAchievements();
  };

  // Añadir a favoritos
  const toggleFavorite = (emotionId) => {
    setUserStats(prev => {
      const isFavorite = prev.favorites.includes(emotionId);
      const newFavorites = isFavorite
        ? prev.favorites.filter(id => id !== emotionId)
        : [...prev.favorites, emotionId];
      
      return {
        ...prev,
        favorites: newFavorites
      };
    });
    checkAchievements();
  };

  // Cambiar tema
  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
    setUserStats(prev => ({
      ...prev,
      themeChanges: prev.themeChanges + 1
    }));
  };

  // Cambiar configuración de sonido
  const toggleSound = () => {
    setSettings(prev => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  // Verificar logros desbloqueados
  const checkAchievements = () => {
    setUserStats(prev => {
      const newUnlocked = [];
      
      achievements.forEach(achievement => {
        if (prev.unlockedAchievements.includes(achievement.id)) return;
        
        let unlocked = false;
        
        switch (achievement.type) {
          case 'spins':
            unlocked = prev.totalSpins >= achievement.requirement;
            break;
          case 'memes':
            unlocked = prev.totalMemes >= achievement.requirement;
            break;
          case 'unique_emotions':
            unlocked = prev.uniqueEmotions.length >= achievement.requirement;
            break;
          case 'streak':
            unlocked = prev.currentStreak >= achievement.requirement;
            break;
          case 'shares':
            unlocked = prev.totalShares >= achievement.requirement;
            break;
          case 'daily_challenges':
            unlocked = prev.dailyChallengesCompleted >= achievement.requirement;
            break;
          case 'favorites':
            unlocked = prev.favorites.length >= achievement.requirement;
            break;
          case 'theme_changes':
            unlocked = prev.themeChanges >= achievement.requirement;
            break;
          case 'categories':
            const categories = new Set(
              prev.uniqueEmotions.map(id => 
                emotions.find(e => e.id === id)?.category
              )
            );
            unlocked = categories.size >= achievement.requirement;
            break;
          case 'emotion_variety':
            const emotionCounts = {};
            prev.emotionHistory.forEach(({ emotion }) => {
              emotionCounts[emotion.id] = (emotionCounts[emotion.id] || 0) + 1;
            });
            const allMeetRequirement = prev.uniqueEmotions.every(
              id => emotionCounts[id] >= achievement.requirement
            );
            unlocked = allMeetRequirement && prev.uniqueEmotions.length === 20;
            break;
          case 'same_emotion':
            const counts = {};
            prev.emotionHistory.forEach(({ emotion }) => {
              counts[emotion.id] = (counts[emotion.id] || 0) + 1;
            });
            unlocked = Object.values(counts).some(count => count >= achievement.requirement);
            break;
          case 'rarity':
            unlocked = prev.emotionHistory.some(
              ({ emotion }) => emotion.rarity === 'legendary'
            );
            break;
        }
        
        if (unlocked) {
          newUnlocked.push(achievement.id);
        }
      });
      
      if (newUnlocked.length > 0) {
        const totalNewPoints = newUnlocked.reduce((sum, id) => {
          const achievement = achievements.find(a => a.id === id);
          return sum + achievement.points;
        }, 0);
        
        return {
          ...prev,
          unlockedAchievements: [...prev.unlockedAchievements, ...newUnlocked],
          points: prev.points + totalNewPoints
        };
      }
      
      return prev;
    });
  };

  // Exportar datos
  const exportData = () => {
    const data = {
      userStats,
      settings,
      exportDate: new Date().toISOString(),
      version: '2.0.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `emocionometro-salchicha-data-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Importar datos
  const importData = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.userStats) setUserStats(data.userStats);
      if (data.settings) setSettings(data.settings);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  };

  // Limpiar historial
  const clearHistory = () => {
    if (confirm('¿Estás seguro de que quieres limpiar todo tu historial? Esta acción no se puede deshacer.')) {
      setUserStats({
        totalSpins: 0,
        totalMemes: 0,
        uniqueEmotions: [],
        emotionHistory: [],
        favorites: [],
        totalShares: 0,
        dailyChallengesCompleted: 0,
        themeChanges: 0,
        firstSpinDate: null,
        lastSpinDate: null,
        currentStreak: 0,
        longestStreak: 0,
        points: 0,
        level: 1,
        unlockedAchievements: []
      });
      localStorage.removeItem('userStats');
    }
  };

  const value = {
    userStats,
    settings,
    currentEmotion,
    dailyChallenge,
    recordSpin,
    recordMeme,
    recordShare,
    toggleFavorite,
    toggleTheme,
    toggleSound,
    exportData,
    importData,
    clearHistory,
    checkAchievements
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}