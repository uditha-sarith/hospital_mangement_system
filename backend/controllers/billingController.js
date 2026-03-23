const db = require('../config/db');

exports.getBilling = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM billing');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addBilling = async (req, res) => {
    const { id, patientId, patientName, amount, date, status, description } = req.body;
    try {
        const query = `INSERT INTO billing (id, patientId, patientName, amount, date, status, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [id || 'b' + Date.now(), patientId, patientName, amount, date, status || 'Pending', description];
        await db.query(query, params);
        res.status(201).json({ message: 'Billing added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBilling = async (req, res) => {
    const { status } = req.body;
    try {
        await db.query('UPDATE billing SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ message: 'Billing updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBilling = async (req, res) => {
    try {
        await db.query('DELETE FROM billing WHERE id = ?', [req.params.id]);
        res.json({ message: 'Billing deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
