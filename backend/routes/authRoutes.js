const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../config/db');

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO users(name, email, password)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, hashedPassword], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Register berhasil'
        });
    });
});

router.post('/login', (req, res) => {

    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email=?`;

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: 'User tidak ditemukan'
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Password salah'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            'SECRETKEY',
            {
                expiresIn: '1d'
            }
        );

        res.json({
            token
        });
    });
});

module.exports = router;