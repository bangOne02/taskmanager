const express = require('express');
const router = express.Router();

const db = require('../config/db');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', (req, res) => {

    const sql = `
        SELECT * FROM tasks
        WHERE user_id=?
        ORDER BY id DESC
    `;

    db.query(sql, [req.user.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.post('/', (req, res) => {

    const {
        title,
        description,
        status,
        due_date
    } = req.body;

    const sql = `
        INSERT INTO tasks
        (user_id, title, description, status, due_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        req.user.id,
        title,
        description,
        status,
        due_date
    ], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Task berhasil ditambah'
        });
    });
});

router.put('/:id', (req, res) => {

    const {
        title,
        description,
        status,
        due_date
    } = req.body;

    const sql = `
        UPDATE tasks
        SET title=?, description=?, status=?, due_date=?
        WHERE id=? AND user_id=?
    `;

    db.query(sql, [
        title,
        description,
        status,
        due_date,
        req.params.id,
        req.user.id
    ], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Task berhasil diupdate'
        });
    });
});

router.delete('/:id', (req, res) => {

    const sql = `
        DELETE FROM tasks
        WHERE id=? AND user_id=?
    `;

    db.query(sql, [
        req.params.id,
        req.user.id
    ], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Task berhasil dihapus'
        });
    });
});

module.exports = router;