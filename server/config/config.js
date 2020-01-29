

// =============================
//   PUERTO
// =============================
process.env.PORT = process.env.PORT || 3000;


// =============================
//   ENTORNO
// =============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


// =============================
//   VENCIMIENTO DEL TOKEN
// =============================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = '30 days';


// =============================
//   SEED DE AUNTENTICACIÓN
// =============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';


// =============================
//   Base de Datos
// =============================
let urlDB;

if( process.env.NODE_ENV === 'dev' ){
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;


// =============================
//   Google Client ID
// =============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '610984424788-28mn6vhuqd16a3lm247m0u248fu8c8sl.apps.googleusercontent.com';