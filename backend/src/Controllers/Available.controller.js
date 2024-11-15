import { pool } from '../config/db.js';

export const getAvailables = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                availables.id_available, 
                availables.description, 
                availables.state 
            FROM 
                availables;
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las disponibilidades:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const getAvailable = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                id_available, 
                description, 
                state 
            FROM 
                availables 
            WHERE 
                id_available = ?;
        `, [req.params.id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Disponibilidad no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la disponibilidad:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const createAvailable = async (req, res) => {
    const { description, state } = req.body;

    try {
        const [rows] = await pool.query(`
            INSERT INTO availables (description, state) 
            VALUES (?, ?);
        `, [
            description, 
            state
        ]);

        res.status(201).json({
            id: rows.insertId,
            description,
            state
        });
    } catch (error) {
        console.error('Error al crear la disponibilidad:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const updateAvailable = async (req, res) => {
    const { id } = req.params;
    const { description, state } = req.body;

    try {
        const [result] = await pool.query(`
            UPDATE availables 
            SET 
                description = IFNULL(?, description),
                state = IFNULL(?, state)
            WHERE id_available = ?;
        `, [
            description,
            state,
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Disponibilidad no encontrada' });
        }

        const [rows] = await pool.query(`
            SELECT * 
            FROM availables 
            WHERE id_available = ?;
        `, [id]);

        res.status(200).json({ message: 'Disponivilidad actualizada exitosamente', available: rows[0] });
    } catch (error) {
        console.error('Error al actualizar la disponibilidad:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const deleteAvailable = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(`
            DELETE FROM availables WHERE id_available = ?;
        `, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Disponibilidad no encontrada' });
        }

        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar la disponibilidad:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};