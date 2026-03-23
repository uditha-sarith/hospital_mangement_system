const db = require('../config/db');

exports.getVitals = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM vitals ORDER BY timestamp DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addVital = async (req, res) => {
    const { id, patientId, heartRate, bloodPressure, sugarLevel, timestamp, recordedBy } = req.body;

    try {
        const query = `
            INSERT INTO vitals (id, patientId, heartRate, bloodPressure, sugarLevel, timestamp, recordedBy)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            id || 'v' + Date.now(),
            patientId,
            heartRate,
            bloodPressure,
            sugarLevel,
            timestamp ? new Date(timestamp) : new Date(),
            recordedBy || 'Unknown'
        ];

        await db.query(query, params);
        res.status(201).json({ message: 'Vital recorded successfully', vitalId: params[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
