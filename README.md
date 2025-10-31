[readme_emociometro.txt](https://github.com/user-attachments/files/23277069/readme_emociometro.txt)
# 🐕 El Emocionómetro Salchicha

[![Next.js](https://img.shields.io/badge/Next.js-13.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue?logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> 🎡 Una ruleta interactiva de emociones protagonizada por adorables perros salchichas. ¡Descubre tu emoción del día, genera memes y colecciona logros!

![Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=El+Emocionomentro+Salchicha)

## ✨ Características Principales

### 🎯 FuncionalidadesCore
- ✅ **Ruleta Interactiva** - 20 emociones únicas con animación suave
- ✅ **Generador de Memes** - Crea y descarga memes personalizados con Canvas
- ✅ **Sonidos Inmersivos** - Efectos de audio al girar y obtener resultados
- ✅ **Diseño Responsive** - Perfectamente adaptado a móviles, tablets y desktop

### 🎮 Gamificación
- 🏆 **Sistema de Logros** - Desbloquea 15+ insignias especiales
- 📊 **Estadísticas Detalladas** - Visualiza tus emociones más frecuentes
- 🎲 **Desafío Diario** - Una emoción especial cada día
- ⭐ **Emociones Favoritas** - Guarda y gestiona tus emociones preferidas
- 📈 **Nivel de Usuario** - Sube de nivel mientras más usas la app

### 💾 Persistencia de Datos
- 📜 **Historial Completo** - Todas tus emociones guardadas localmente
- 🔄 **Sincronización** - Datos persistentes entre sesiones
- 📤 **Exportar Datos** - Descarga tu historial en JSON
- 🗑️ **Gestión de Datos** - Limpia tu historial cuando quieras

### 🎨 Experiencia de Usuario
- 🌙 **Modo Oscuro/Claro** - Cambia entre temas con un click
- 📱 **PWA Ready** - Instálala como app nativa
- 🔊 **Control de Audio** - Activa/desactiva sonidos
- 🎭 **Animaciones Suaves** - Transiciones CSS optimizadas
- 🌐 **Multilenguaje** - Soporte para español e inglés

### 🚀 Compartir y Social
- 📲 **Compartir en Redes** - Twitter, Facebook, WhatsApp
- 📷 **Captura de Pantalla** - Comparte tu emoción actual
- 🔗 **Links Compartibles** - URLs únicas para cada emoción

## 🛠️ Stack Tecnológico

```
Frontend Framework: Next.js 13.5
UI Library: React 18.2
Styling: CSS Modules + Tailwind-like utilities
State Management: React Hooks + Context API
Storage: LocalStorage API
Canvas: HTML5 Canvas para generación de memes
PWA: Next-PWA plugin
```

## 📦 Instalación

### Prerrequisitos
- Node.js >= 18.0.0
- npm o yarn o pnpm

### Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/dachshund-emotion-wheel.git
cd dachshund-emotion-wheel
```

### Instalar Dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### Ejecutar en Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
dachshund-emotion-wheel/
├── components/
│   ├── EmotionWheel.js          # Componente principal de la ruleta
│   ├── EmotionResult.js         # Mostrar resultado de emoción
│   ├── MemeGenerator.js         # Generador de memes con canvas
│   ├── HistoryPanel.js          # Panel de historial
│   ├── StatsPanel.js            # Estadísticas y gráficos
│   ├── AchievementsPanel.js    # Sistema de logros
│   ├── ThemeToggle.js           # Cambiar tema oscuro/claro
│   ├── SoundControl.js          # Control de audio
│   ├── ShareButtons.js          # Botones para compartir
│   └── DailyChallenge.js        # Desafío diario
├── pages/
│   ├── index.js                 # Página principal
│   ├── _app.js                  # App wrapper con providers
│   └── _document.js             # Document personalizado
├── public/
│   ├── images/
│   │   └── emotions/            # Imágenes de perros por emoción
│   ├── sounds/
│   │   ├── spin.mp3            # Sonido al girar
│   │   ├── result.mp3          # Sonido de resultado
│   │   └── achievement.mp3     # Sonido de logro
│   ├── manifest.json            # PWA manifest
│   └── favicon.ico
├── styles/
│   ├── globals.css              # Estilos globales
│   ├── Home.module.css          # Estilos del home
│   ├── themes.css               # Temas oscuro/claro
│   └── animations.css           # Animaciones custom
├── data/
│   ├── emotions.js              # 20 emociones con datos
│   ├── achievements.js          # Definición de logros
│   └── dachshundFacts.js       # Datos curiosos de salchichas
├── context/
│   ├── AppContext.js            # Context global de la app
│   └── ThemeContext.js          # Context de tema
├── hooks/
│   ├── useLocalStorage.js       # Hook para localStorage
│   ├── useSound.js              # Hook para sonidos
│   └── useAchievements.js       # Hook para logros
├── utils/
│   ├── canvas.js                # Utilidades de canvas
│   ├── storage.js               # Helpers de storage
│   └── dateUtils.js             # Utilidades de fecha
├── package.json
├── next.config.js
├── .gitignore
└── README.md
```

## 🎯 Guía de Uso

### 1. Girar la Ruleta
- Click en el botón "¡Girar la Rueda!"
- Espera la animación
- Descubre tu emoción

### 2. Generar Memes
- Después de obtener una emoción, click en "Crear Meme"
- Personaliza el texto (opcional)
- Descarga o comparte directamente

### 3. Ver Historial
- Click en el icono de historial
- Revisa todas tus emociones anteriores
- Filtra por fecha o emoción

### 4. Coleccionar Logros
- Usa la app regularmente
- Desbloquea logros especiales:
  - 🎯 Primera Girada
  - 🔥 Racha de 7 días
  - 🌟 Colecciona todas las emociones
  - Y muchos más...

### 5. Desafío Diario
- Cada día una emoción especial
- Completa el desafío para puntos extra

## 🚀 Deploy en Vercel

### Opción 1: Deploy Automático (Recomendado)

1. **Sube el código a GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Emocionómetro Salchicha"
git branch -M main
git remote add origin https://github.com/tu-usuario/dachshund-emotion-wheel.git
git push -u origin main
```

2. **Conecta con Vercel:**
- Ve a [vercel.com](https://vercel.com)
- Click en "New Project"
- Importa tu repositorio de GitHub
- Vercel detectará automáticamente Next.js
- Click en "Deploy"

### Opción 2: Deploy desde CLI

```bash
npm i -g vercel
vercel login
vercel
```

### Variables de Entorno (Opcional)
Si en el futuro agregas APIs externas:
```env
NEXT_PUBLIC_API_URL=https://tu-api.com
```

## 🌟 Características Avanzadas

### PWA (Progressive Web App)
La app puede instalarse en dispositivos móviles:
- Android: Menu → "Agregar a pantalla de inicio"
- iOS: Safari → Compartir → "Agregar a inicio"

### Modo Offline
Gracias al service worker, la app funciona sin conexión.

### Optimización de Performance
- Lazy loading de componentes
- Code splitting automático con Next.js
- Imágenes optimizadas
- CSS crítico inline

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres mejorar el proyecto:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Add: nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📝 To-Do / Roadmap

- [ ] Backend con base de datos real
- [ ] Sistema de usuarios y login
- [ ] Leaderboard global
- [ ] Más idiomas (inglés, portugués)
- [ ] Integración con redes sociales
- [ ] API pública para developers
- [ ] Modo multijugador
- [ ] Personalización de avatares

## 🐛 Reportar Bugs

Si encuentras algún bug, por favor:
1. Revisa que no esté ya reportado en [Issues](https://github.com/tu-usuario/dachshund-emotion-wheel/issues)
2. Crea un nuevo issue con:
   - Descripción del bug
   - Pasos para reproducirlo
   - Screenshots si aplica
   - Info del navegador/dispositivo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Twitter: [@tu-twitter](https://twitter.com/tu-twitter)

## 🙏 Agradecimientos

- Iconos: [Lucide Icons](https://lucide.dev)
- Inspiración: Todos los adorables perros salchichas del mundo 🐕
- Comunidad de Next.js

## 📸 Screenshots

### Desktop
![Desktop View](https://via.placeholder.com/800x500/667eea/ffffff?text=Desktop+View)

### Mobile
![Mobile View](https://via.placeholder.com/400x800/667eea/ffffff?text=Mobile+View)

### Meme Generator
![Meme Generator](https://via.placeholder.com/600x600/764ba2/ffffff?text=Meme+Generator)

---

Hecho con ❤️ y mucho humor perruno 🐕

**¿Te gustó el proyecto? ¡Dale una ⭐ en GitHub!**
