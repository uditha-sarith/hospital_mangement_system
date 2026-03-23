const db = require('../config/db');

exports.getAppointments = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM appointments');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addAppointment = async (req, res) => {
    const { id, patientId, patientName, doctorId, doctorName, date, time, status, notes } = req.body;
    try {
        const query = `INSERT INTO appointments (id, patientId, patientName, doctorId, doctorName, date, time, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const params = [id || 'a' + Date.now(), patientId, patientName, doctorId, doctorName, date, time, status || 'Pending', notes];
        await db.query(query, params);
        res.status(201).json({ message: 'Appointment added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateAppointment = async (req, res) => {
    const { status, notes } = req.body;
    try {
        await db.query('UPDATE appointments SET status = ?, notes = ? WHERE id = ?', [status, notes, req.params.id]);
        res.json({ message: 'Appointment updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        await db.query('DELETE FROM appointments WHERE id = ?', [req.params.id]);
        res.json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
