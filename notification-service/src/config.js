require('dotenv').config();

console.log("Variáveis carregadas:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  hasPassword: !!process.env.DB_PASSWORD // Apenas para checar se existe sem printar a senha
});

module.exports = {
  kafka: {
    broker: process.env.KAFKA_BROKER || 'localhost:9092'
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
};