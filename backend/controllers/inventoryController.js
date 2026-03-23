const db = require('../config/db');

exports.getInventory = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM inventory');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addInventoryItem = async (req, res) => {
    const { id, name, category, quantity, unit, threshold, status } = req.body;
    try {
        const query = `INSERT INTO inventory (id, name, category, quantity, unit, threshold, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [id || 'i' + Date.now(), name, category, quantity, unit, threshold, status || 'Good'];
        await db.query(query, params);
        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInventoryItem = async (req, res) => {
    const { quantity, status } = req.body;
    try {
        await db.query('UPDATE inventory SET quantity = ?, status = ? WHERE id = ?', [quantity, status, req.params.id]);
        res.json({ message: 'Item updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteInventoryItem = async (req, res) => {
    try {
        await db.query('DELETE FROM inventory WHERE id = ?', [req.params.id]);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
