const express = require('express');
const cors = require('cors');

const app = express();

// Render asigna un puerto dinámico mediante process.env.PORT.
// Si se ejecuta en local, utilizará el puerto 3000.
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde tu Frontend en otro dominio
app.use(express.json());

// Base de datos en memoria (Animes)
const animes = [
  {
    id: 'air-tv',
    anime: 'Air TV',
    genero: ['Drama', 'Romance', 'Sobrenatural'],
    capitulos: 12,
    personajesPrincipales: [
      'Yukito Kunisaki',
      'Misuzu Kamio'
    ],
    personajesSecundarios: [
      'Kano Kirishima',
      'Minagi Tohno',
      'Michiru',
      'Haruko Kamio',
      'Uraha'
    ]
  },
  {
    id: 'clannad',
    anime: 'Clannad',
    genero: ['Romance', 'Drama', 'Comedia', 'Escolar'],
    capitulos: 23,
    personajesPrincipales: [
      'Tomoya Okazaki',
      'Nagisa Furukawa'
    ],
    personajesSecundarios: [
      'Kyou Fujibayashi',
      'Ryou Fujibayashi',
      'Tomoyo Sakagami',
      'Kotomi Ichinose',
      'Youhei Sunohara'
    ]
  },
  {
    id: 'toradora',
    anime: 'Toradora!',
    genero: ['Romance', 'Comedia', 'Drama', 'Escolar'],
    capitulos: 25,
    personajesPrincipales: [
      'Ryuuji Takasu',
      'Taiga Aisaka'
    ],
    personajesSecundarios: [
      'Minori Kushieda',
      'Yuusaku Kitamura',
      'Ami Kawashima',
      'Yasuko Takasu',
      'Sumire Kanou'
    ]
  },
  {
    id: 'nodame-cantabile',
    anime: 'Nodame Cantabile',
    genero: ['Música', 'Romance', 'Comedia', 'Drama'],
    capitulos: 23,
    personajesPrincipales: [
      'Megumi Noda',
      'Shinichi Chiaki'
    ],
    personajesSecundarios: [
      'Ryutaro Mine',
      'Masumi Okuyama',
      'Kiyora Miki',
      'Franz von Stresemann',
      'Saiko Tagaya'
    ]
  },
  {
    id: 'shigatsu-wa-kimi-no-uso',
    anime: 'Shigatsu wa Kimi no Uso',
    genero: ['Drama', 'Romance', 'Música', 'Escolar'],
    capitulos: 22,
    personajesPrincipales: [
      'Kousei Arima',
      'Kaori Miyazono'
    ],
    personajesSecundarios: [
      'Tsubaki Sawabe',
      'Ryouta Watari',
      'Takeshi Aiza',
      'Emi Igawa',
      'Hiroko Seto'
    ]
  },
  {
    id: 'golden-time',
    anime: 'Golden Time',
    genero: ['Romance', 'Comedia', 'Drama'],
    capitulos: 24,
    personajesPrincipales: [
      'Banri Tada',
      'Kouko Kaga'
    ],
    personajesSecundarios: [
      'Mitsuo Yanagisawa',
      'Chinami Oka',
      'Nana Hayashida',
      'Linda'
    ]
  },
  {
    id: 'death-note',
    anime: 'Death Note',
    genero: ['Suspenso', 'Psicológico', 'Misterio', 'Sobrenatural'],
    capitulos: 37,
    personajesPrincipales: [
      'Light Yagami',
      'L Lawliet'
    ],
    personajesSecundarios: [
      'Ryuk',
      'Misa Amane',
      'Near',
      'Mello',
      'Soichiro Yagami'
    ]
  },
  {
    id: 'saber-marionette-j',
    anime: 'Saber Marionette J',
    genero: ['Ciencia ficción', 'Comedia', 'Acción', 'Romance'],
    capitulos: 25,
    personajesPrincipales: [
      'Otaru Mamiya',
      'Lime',
      'Cherry',
      'Bloodberry'
    ],
    personajesSecundarios: [
      'Faust',
      'Tiger',
      'Luchs',
      'Panther',
      'Gelda'
    ]
  },
  {
    id: 'evangelion',
    anime: 'Neon Genesis Evangelion',
    genero: ['Ciencia ficción', 'Mecha', 'Drama', 'Psicológico'],
    capitulos: 26,
    personajesPrincipales: [
      'Shinji Ikari',
      'Rei Ayanami',
      'Asuka Langley Soryu'
    ],
    personajesSecundarios: [
      'Misato Katsuragi',
      'Gendo Ikari',
      'Ritsuko Akagi',
      'Kaworu Nagisa',
      'Toji Suzuhara'
    ]
  },
  {
    id: 'great-teacher-onizuka',
    anime: 'Great Teacher Onizuka',
    genero: ['Comedia', 'Drama', 'Escolar', 'Acción'],
    capitulos: 43,
    personajesPrincipales: [
      'Eikichi Onizuka'
    ],
    personajesSecundarios: [
      'Azusa Fuyutsuki',
      'Ryuji Danma',
      'Kunio Murai',
      'Urumi Kanzaki',
      'Hiroshi Uchiyamada'
    ]
  }
];

// Ruta raíz (para comprobar salud del servidor)
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Animes funcionando correctamente' });
});

// Ruta principal: lista de todos los animes
app.get('/api/animes', (req, res) => {
  res.json(animes);
});

// Buscar un anime por su ID
app.get('/api/animes/:id', (req, res) => {
  const { id } = req.params;

  const animeEncontrado = animes.find(anime => anime.id === id);

  if (!animeEncontrado) {
    return res.status(404).json({
      error: 'Anime no encontrado'
    });
  }

  res.json(animeEncontrado);
});

// Consultar los géneros disponibles
app.get('/api/generos', (req, res) => {
  const generos = [];

  animes.forEach(anime => {
    anime.genero.forEach(genero => {
      if (!generos.includes(genero)) {
        generos.push(genero);
      }
    });
  });

  res.json(generos);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
