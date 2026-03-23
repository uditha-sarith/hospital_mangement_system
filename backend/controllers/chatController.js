const db = require('../config/db');

exports.getChats = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM chats ORDER BY timestamp ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addChat = async (req, res) => {
    const { id, senderId, receiverId, message, timestamp } = req.body;
    try {
        const query = `INSERT INTO chats (id, senderId, receiverId, message, timestamp, isRead) VALUES (?, ?, ?, ?, ?, 0)`;
        const params = [id || 'c' + Date.now(), senderId, receiverId, message, timestamp || new Date().toISOString().slice(0, 19).replace('T', ' ')];
        await db.query(query, params);
        res.status(201).json({ message: 'Chat added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
