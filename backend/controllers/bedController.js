const db = require('../config/db');

exports.getBeds = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT b.*, p.name AS patientName 
            FROM beds b 
            LEFT JOIN patients p ON b.patientId = p.id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBed = async (req, res) => {
    const bedId = req.params.id;
    const { status, patientId, admissionDate } = req.body;

    try {
        if (status === 'Occupied' && patientId) {
            // Safety check 1: Ensure bed is available
            const [bedCheck] = await db.query('SELECT status FROM beds WHERE id = ?', [bedId]);
            if (bedCheck.length === 0) return res.status(404).json({ message: 'Bed not found' });
            if (bedCheck[0].status !== 'Available') {
                return res.status(400).json({ message: 'Admission failed: Bed is not available' });
            }

            // Safety check 2: Ensure patient is not already assigned to another bed
            const [patientCheck] = await db.query('SELECT id, number FROM beds WHERE patientId = ?', [patientId]);
            if (patientCheck.length > 0) {
                return res.status(400).json({ message: 'Patient is already admitted in Bed ' + patientCheck[0].number });
            }
        }

        let query = 'UPDATE beds SET status = ?';
        const params = [status];

        if (status === 'Occupied') {
            query += ', patientId = ?, admissionDate = ?';
            params.push(patientId, admissionDate || new Date().toISOString().split('T')[0]);
        } else if (status === 'Available') {
            // Discharge case
            query += ', patientId = NULL, admissionDate = NULL';
        }

        query += ' WHERE id = ?';
        params.push(bedId);

        await db.query(query, params);
        res.json({ message: 'Bed updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
