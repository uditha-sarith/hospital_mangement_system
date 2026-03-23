const db = require('../config/db');

exports.getUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addUser = async (req, res) => {
    const { id, name, username, password, role, status, email, patientId } = req.body;
    try {
        const query = `INSERT INTO users (id, name, username, password, role, status, email, patientId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [id || 'u' + Date.now(), name, username, password || '', role, status || 'Active', email || '', patientId || null];
        await db.query(query, params);
        res.status(201).json({ message: 'User added successfully', userId: params[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { name, username, password, role, status, email } = req.body;
    try {
        const query = `UPDATE users SET name = ?, username = ?, password = ?, role = ?, status = ?, email = ? WHERE id = ?`;
        const params = [name, username, password, role, status, email, req.params.id];
        await db.query(query, params);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
