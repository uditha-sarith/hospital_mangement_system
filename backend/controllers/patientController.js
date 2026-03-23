const db = require('../config/db');

exports.getPatients = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM patients');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM patients WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addPatient = async (req, res) => {
    const { id, name, age, gender, phone, address, notes } = req.body;

    try {
        const query = `
            INSERT INTO patients (id, name, age, gender, phone, address, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            id || 'p' + Date.now(),
            name,
            age,
            gender,
            phone,
            address,
            notes
        ];

        await db.query(query, params);
        res.status(201).json({ message: 'Patient added successfully', patientId: params[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePatient = async (req, res) => {
    const { name, age, gender, phone, address, notes } = req.body;
    const { id } = req.params;

    try {
        const query = `
            UPDATE patients 
            SET name = ?, age = ?, gender = ?, phone = ?, address = ?, notes = ?
            WHERE id = ?
        `;
        const params = [name, age, gender, phone, address, notes, id];

        const [result] = await db.query(query, params);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json({ message: 'Patient updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePatient = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM patients WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
