const db = require('../config/db');

exports.getWards = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM wards');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
