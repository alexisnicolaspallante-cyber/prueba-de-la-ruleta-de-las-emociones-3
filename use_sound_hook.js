import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

export function useSound() {
  const { settings } = useApp();
  const audioCache = useRef({});

  // Precargar sonidos
  useEffect(() => {
    if (settings.soundEnabled) {
      const sounds = {
        spin: '/sounds/spin.mp3',
        result: '/sounds/result.mp3',
        achievement: '/sounds/achievement.mp3',
        click: '/sounds/click.mp3',
        success: '/sounds/success.mp3',
        notification: '/sounds/notification.mp3'
      };

      Object.entries(sounds).forEach(([key, path]) => {
        if (!audioCache.current[key]) {
          const audio = new Audio(path);
          audio.preload = 'auto';
          audioCache.current[key] = audio;
        }
      });
    }
  }, [settings.soundEnabled]);

  const playSound = (soundName, volume = 0.5) => {
    if (!settings.soundEnabled) return;

    try {
      const audio = audioCache.current[soundName];
      if (audio) {
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play().catch(err => console.log('Error playing sound:', err));
      }
    } catch (error) {
      console.log('Sound error:', error);
    }
  };

  return { playSound };
}

// Hook alternativo que usa Web Audio API para mejor control
export function useWebAudio() {
  const { settings } = useApp();
  const audioContext = useRef(null);
  const buffers = useRef({});

  useEffect(() => {
    if (settings.soundEnabled && !audioContext.current) {
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, [settings.soundEnabled]);

  const playTone = (frequency = 440, duration = 0.2, type = 'sine') => {
    if (!settings.soundEnabled || !audioContext.current) return;

    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.current.currentTime + duration
    );

    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration);
  };

  const playSuccessSound = () => {
    playTone(523.25, 0.1); // C5
    setTimeout(() => playTone(659.25, 0.1), 100); // E5
    setTimeout(() => playTone(783.99, 0.2), 200); // G5
  };

  const playClickSound = () => {
    playTone(800, 0.05, 'square');
  };

  const playSpinSound = () => {
    if (!settings.soundEnabled || !audioContext.current) return;
    
    // Sonido ascendente durante el giro
    const duration = 2;
    const steps = 20;
    const startFreq = 200;
    const endFreq = 800;
    
    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        const freq = startFreq + (endFreq - startFreq) * (i / steps);
        playTone(freq, 0.1, 'triangle');
      }, (duration * 1000 / steps) * i);
    }
  };

  return {
    playTone,
    playSuccessSound,
    playClickSound,
    playSpinSound
  };
}