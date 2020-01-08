

// =============================
//   PUERTO
// =============================
process.env.PORT = process.env.PORT || 3000;


// =============================
//   ENTORNO
// =============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// =============================
//   Base de Datos
// =============================
let urlDB;

// if( process.env.NODE_ENV === 'dev' ){
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
     urlDB = 'mongodb+srv://illak:euXfuNenlRNTfe1Z@cluster0-cbdtu.gcp.mongodb.net/cafe?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true';
// }

process.env.URLDB = urlDB;