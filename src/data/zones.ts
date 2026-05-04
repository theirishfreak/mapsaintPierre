export interface Zone {
  id: string
  name: string
  emoji: string
  position: [number, number, number]
  cameraPosition: [number, number, number]
  schedule: { time: string; label: string }[]
  description: string
  category: 'mixte' | 'adultes' | 'enfants' | 'general'
}

export const zones: Zone[] = [
  {
    id: 'scene',
    name: 'Scène Principale',
    emoji: '🎸',
    position: [-65, 0, -40],
    cameraPosition: [-40, 20, -10],
    schedule: [
      { time: '18h00', label: 'Ouverture du bal' },
      { time: '20h00', label: 'Concert country live' },
      { time: '22h30', label: 'Show de line dance' },
      { time: '00h00', label: 'Finale & feux' },
    ],
    description:
      'La grande scène western accueille concerts country, shows de danse et animations tout au long de la soirée. Spots dorés, rideau rouge et ambiance saloon garantis.',
    category: 'general',
  },
  {
    id: 'repas',
    name: 'Aire de Repas',
    emoji: '🍖',
    position: [-65, 0, 35],
    cameraPosition: [-40, 20, 55],
    schedule: [
      { time: '12h00', label: 'Service déjeuner' },
      { time: '19h00', label: 'Grand BBQ du soir' },
      { time: '21h00', label: 'Desserts & café' },
    ],
    description:
      'Longues tables sous auvents avec guirlandes vintage. Les food trucks en diligences servent BBQ, chili et spécialités tex-mex. Ambiance conviviale et bougies le soir.',
    category: 'mixte',
  },
  {
    id: 'saloon',
    name: 'Saloon',
    emoji: '🥃',
    position: [-50, 0, -10],
    cameraPosition: [-25, 15, 15],
    schedule: [
      { time: '17h00', label: 'Happy hour apéro' },
      { time: '20h00', label: 'Soirée whiskey & bourbon' },
      { time: '23h00', label: 'Late night bar' },
    ],
    description:
      'Le saloon façade 2 étages avec batwing doors et fenêtres ambrées. Tonneaux, chaises en terrasse et lampes à pétrole. Bar à whiskey intérieur avec sélection de spiritueux.',
    category: 'adultes',
  },
  {
    id: 'photobooth',
    name: 'Photobooth',
    emoji: '📸',
    position: [0, 0, -55],
    cameraPosition: [20, 15, -30],
    schedule: [
      { time: '14h00', label: 'Ouverture photobooth' },
      { time: '22h00', label: 'Dernière session photo' },
    ],
    description:
      'Pavillon trompe-l\'œil saloon avec accessoires western : chapeaux, étoiles de shérif, pistolets factices. Lampe boule vintage et caisse à accessoires.',
    category: 'mixte',
  },
  {
    id: 'tir-cible',
    name: 'Tir à la Cible',
    emoji: '🏹',
    position: [35, 0, 45],
    cameraPosition: [15, 20, 65],
    schedule: [
      { time: '14h00', label: 'Initiation arc' },
      { time: '16h00', label: 'Compétition junior' },
    ],
    description:
      'Râtelier d\'arcs, 3 cibles cactus et sacs de paille. Encadré par des animateurs western. Accessible dès 6 ans avec équipement adapté.',
    category: 'enfants',
  },
  {
    id: 'poney',
    name: 'Poney Express',
    emoji: '🐴',
    position: [45, 0, 30],
    cameraPosition: [25, 20, 55],
    schedule: [
      { time: '14h00', label: 'Balade poneys' },
      { time: '17h00', label: 'Dernière session' },
    ],
    description:
      'Enclos rond avec 2 poneys pour les petits cavaliers. Cheval à bascule géant pour les tout-petits. Animateurs diplômés présents en permanence.',
    category: 'enfants',
  },
  {
    id: 'poker',
    name: 'Poker du Shérif',
    emoji: '🃏',
    position: [35, 0, -25],
    cameraPosition: [15, 20, -5],
    schedule: [
      { time: '18h00', label: 'Tournoi poker débutants' },
      { time: '21h00', label: 'Grande finale' },
    ],
    description:
      'Tables de poker western avec jetons, cartes et lampes basses. Tournois en jetons fictifs avec croupiers costumés. Ambiance casino far west.',
    category: 'adultes',
  },
  {
    id: 'rodeo',
    name: 'Rodéo Mécanique',
    emoji: '🤠',
    position: [55, 0, -25],
    cameraPosition: [30, 20, -5],
    schedule: [
      { time: '17h00', label: 'Rodéo ouvert' },
      { time: '22h00', label: 'Championnat du soir' },
    ],
    description:
      'Taureau mécanique gonflable sur tapis de sécurité. Rotations et à-coups progressifs selon le niveau. Concours du meilleur cowboy de la soirée !',
    category: 'adultes',
  },
  {
    id: 'line-dance',
    name: 'Line Dance',
    emoji: '💃',
    position: [45, 0, -10],
    cameraPosition: [20, 20, 10],
    schedule: [
      { time: '18h30', label: 'Initiation line dance' },
      { time: '20h30', label: 'Session avancés' },
      { time: '22h30', label: 'Dancefloor libre' },
    ],
    description:
      'Dancefloor parquet avec marquages au sol. Cours d\'initiation pour débutants puis session libre. Professeurs qualifiés et playlist country sélectionnée.',
    category: 'adultes',
  },
]
