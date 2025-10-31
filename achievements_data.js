export const achievements = [
  {
    id: 'first_spin',
    name: '🎯 Primera Girada',
    description: 'Gira la ruleta por primera vez',
    icon: '🎡',
    requirement: 1,
    type: 'spins',
    rarity: 'common',
    points: 10
  },
  {
    id: 'spin_master',
    name: '🌀 Maestro del Giro',
    description: 'Gira la ruleta 50 veces',
    icon: '🌪️',
    requirement: 50,
    type: 'spins',
    rarity: 'rare',
    points: 100
  },
  {
    id: 'spin_legend',
    name: '👑 Leyenda del Giro',
    description: 'Gira la ruleta 200 veces',
    icon: '⭐',
    requirement: 200,
    type: 'spins',
    rarity: 'legendary',
    points: 500
  },
  {
    id: 'first_meme',
    name: '🎨 Primer Meme',
    description: 'Crea tu primer meme',
    icon: '🖼️',
    requirement: 1,
    type: 'memes',
    rarity: 'common',
    points: 15
  },
  {
    id: 'meme_creator',
    name: '🎭 Creador de Memes',
    description: 'Crea 25 memes',
    icon: '🎪',
    requirement: 25,
    type: 'memes',
    rarity: 'uncommon',
    points: 75
  },
  {
    id: 'meme_god',
    name: '🌟 Dios del Meme',
    description: 'Crea 100 memes',
    icon: '✨',
    requirement: 100,
    type: 'memes',
    rarity: 'legendary',
    points: 300
  },
  {
    id: 'collector',
    name: '📚 Coleccionista',
    description: 'Obtén las 20 emociones diferentes',
    icon: '🏆',
    requirement: 20,
    type: 'unique_emotions',
    rarity: 'rare',
    points: 200
  },
  {
    id: 'week_streak',
    name: '🔥 Racha Semanal',
    description: 'Usa la app 7 días seguidos',
    icon: '📅',
    requirement: 7,
    type: 'streak',
    rarity: 'uncommon',
    points: 50
  },
  {
    id: 'month_streak',
    name: '💪 Racha Mensual',
    description: 'Usa la app 30 días seguidos',
    icon: '🗓️',
    requirement: 30,
    type: 'streak',
    rarity: 'legendary',
    points: 500
  },
  {
    id: 'early_bird',
    name: '🌅 Madrugador',
    description: 'Gira la ruleta antes de las 7 AM',
    icon: '🐦',
    requirement: 1,
    type: 'special',
    rarity: 'uncommon',
    points: 30
  },
  {
    id: 'night_owl',
    name: '🦉 Búho Nocturno',
    description: 'Gira la ruleta después de las 11 PM',
    icon: '🌙',
    requirement: 1,
    type: 'special',
    rarity: 'uncommon',
    points: 30
  },
  {
    id: 'lucky_seven',
    name: '🍀 Siete de Suerte',
    description: 'Obtén la misma emoción 7 veces',
    icon: '🎰',
    requirement: 7,
    type: 'same_emotion',
    rarity: 'rare',
    points: 150
  },
  {
    id: 'share_master',
    name: '📱 Rey del Compartir',
    description: 'Comparte 10 emociones en redes sociales',
    icon: '🚀',
    requirement: 10,
    type: 'shares',
    rarity: 'uncommon',
    points: 60
  },
  {
    id: 'daily_complete',
    name: '⭐ Desafío Completo',
    description: 'Completa 10 desafíos diarios',
    icon: '🎯',
    requirement: 10,
    type: 'daily_challenges',
    rarity: 'rare',
    points: 100
  },
  {
    id: 'emotion_master',
    name: '🧠 Maestro Emocional',
    description: 'Obtén cada emoción al menos 3 veces',
    icon: '🎓',
    requirement: 3,
    type: 'emotion_variety',
    rarity: 'legendary',
    points: 400
  },
  {
    id: 'speed_runner',
    name: '⚡ Velocista',
    description: 'Gira 10 veces en menos de 5 minutos',
    icon: '💨',
    requirement: 10,
    type: 'speed',
    rarity: 'rare',
    points: 120
  },
  {
    id: 'patient_one',
    name: '🧘 El Paciente',
    description: 'Espera 24 horas entre giros',
    icon: '⏰',
    requirement: 1,
    type: 'special',
    rarity: 'uncommon',
    points: 40
  },
  {
    id: 'legendary_emotion',
    name: '💎 Emoción Legendaria',
    description: 'Obtén una emoción legendaria',
    icon: '👑',
    requirement: 1,
    type: 'rarity',
    rarity: 'legendary',
    points: 250
  },
  {
    id: 'favorite_collector',
    name: '❤️ Colector de Favoritos',
    description: 'Marca 10 emociones como favoritas',
    icon: '⭐',
    requirement: 10,
    type: 'favorites',
    rarity: 'common',
    points: 25
  },
  {
    id: 'theme_switcher',
    name: '🎨 Camaleón',
    description: 'Cambia entre tema claro y oscuro 5 veces',
    icon: '🌗',
    requirement: 5,
    type: 'theme_changes',
    rarity: 'common',
    points: 20
  },
  {
    id: 'perfect_week',
    name: '✨ Semana Perfecta',
    description: 'Obtén una emoción diferente cada día de la semana',
    icon: '📆',
    requirement: 7,
    type: 'special',
    rarity: 'rare',
    points: 180
  },
  {
    id: 'emotion_explorer',
    name: '🗺️ Explorador Emocional',
    description: 'Obtén al menos una emoción de cada categoría',
    icon: '🧭',
    requirement: 6,
    type: 'categories',
    rarity: 'uncommon',
    points: 80
  }
];

// Niveles del usuario
export const userLevels = [
  { level: 1, name: 'Cachorro Novato', minPoints: 0, icon: '🐶', color: '#95A5A6' },
  { level: 2, name: 'Salchicha Aprendiz', minPoints: 100, icon: '🐕', color: '#3498DB' },
  { level: 3, name: 'Perro Entusiasta', minPoints: 300, icon: '🦴', color: '#2ECC71' },
  { level: 4, name: 'Can Experimentado', minPoints: 600, icon: '🌟', color: '#F39C12' },
  { level: 5, name: 'Salchicha Maestro', minPoints: 1000, icon: '👑', color: '#9B59B6' },
  { level: 6, name: 'Perro Legendario', minPoints: 1500, icon: '⭐', color: '#E74C3C' },
  { level: 7, name: 'Deidad Canina', minPoints: 2500, icon: '✨', color: '#F39C12' },
  { level: 8, name: 'Emoción Suprema', minPoints: 4000, icon: '💎', color: '#1ABC9C' },
  { level: 9, name: 'Salchicha Cósmico', minPoints: 6000, icon: '🌌', color: '#E84393' },
  { level: 10, name: 'Dios del Emocionómetro', minPoints: 10000, icon: '🔥', color: '#FFD700' }
];

// Función para obtener nivel según puntos
export function getUserLevel(points) {
  for (let i = userLevels.length - 1; i >= 0; i--) {
    if (points >= userLevels[i].minPoints) {
      return userLevels[i];
    }
  }
  return userLevels[0];
}

// Datos curiosos sobre perros salchicha
export const dachshundFacts = [
  "Los perros salchicha fueron originalmente criados en Alemania para cazar tejones.",
  "Su nombre en alemán 'Dachshund' significa literalmente 'perro tejón'.",
  "Pueden tener tres tipos de pelaje: suave, de alambre o largo.",
  "Son valientes y a veces no son conscientes de su pequeño tamaño.",
  "Los perros salchicha son conocidos por ser tercos pero muy leales.",
  "Tienen una columna vertebral larga que requiere cuidados especiales.",
  "Son excelentes perros guardianes a pesar de su tamaño.",
  "Los salchichas aman cavar y pueden hacer túneles impresionantes.",
  "Son una de las razas de perros más populares del mundo.",
  "Tienen un ladrido sorprendentemente fuerte para su tamaño.",
  "Los perros salchicha miniatura pueden pesar tan solo 5 kg.",
  "Son perros muy expresivos y pueden hacer caras muy graciosas.",
  "Aman estar bajo las mantas por su instinto de hacer madrigueras.",
  "Pueden ser excelentes con los niños si se socializan adecuadamente.",
  "Los salchichas tienen una expectativa de vida de 12-16 años."
];

// Consejos sobre emociones
export const emotionalTips = [
  "Todas las emociones son válidas, incluso las incómodas.",
  "Reconocer tus emociones es el primer paso para gestionarlas.",
  "Es normal sentir múltiples emociones al mismo tiempo.",
  "Las emociones son temporales, ninguna dura para siempre.",
  "Hablar sobre tus emociones puede ayudarte a procesarlas mejor.",
  "El ejercicio físico puede mejorar significativamente tu estado emocional.",
  "Dormir bien es fundamental para la regulación emocional.",
  "La gratitud puede transformar emociones negativas en positivas.",
  "Está bien pedir ayuda cuando las emociones te abruman.",
  "Tus emociones no definen quién eres, solo cómo te sientes ahora."
];