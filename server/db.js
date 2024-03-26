// db.js

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 's554ongw9quh1xjs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'cviqm8lnbslxjltk',
    password: 'mqdzp35gb6vnbj2p',
    database: 'egkyikk14s0zbsl5',
    waitForConnections: true,
    connectionLimit: 10, // Adjust based on your needs
    queueLimit: 0
});

module.exports = pool.promise(); // Use promise() for async/await syntax
