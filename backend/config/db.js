const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task_manager'
});

connection.connect((err) => {
    if (err) {
        console.log('Database gagal konek');
    } else {
        console.log('Database terkoneksi');
    }
});

module.exports = connection;