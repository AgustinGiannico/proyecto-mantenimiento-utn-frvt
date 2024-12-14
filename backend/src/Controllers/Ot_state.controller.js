import { pool } from '../config/db.js';

export const getOtStates = async (req, res) => {
    try{
        const [rows] = await pool.query(`
            SELECT
                ot_states.id_ot_state,
                ot_states.description
            FROM
                ot_states
            ORDER BY
                id_ot_state ASC;
        `);
        res.json(rows)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estados de la orden de trabajo' });
    }
}

export const getOtState = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                ot_states.id_ot_state,
                ot_states.description
            FROM
                ot_states
            WHERE 
                ot_states.id_ot_state = ?;
        `, [req.params.id]);

        if (rows.length === 0) return res.status(404).json({ message: 'Estado de orden de trabajo no encontrado' });

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el estado de la orden de trabajo' });
    }
};

export const createOtState = async (req, res) => {
    const { description } = req.body;

    try {
        const [result] = await pool.query(`
            INSERT INTO ot_states (description) 
            VALUES (?);
        `, [description]);

        res.status(201).json({
            id: result.insertId,
            description,
            message: 'Estado de orden de trabajo creado exitosamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el estado de orden de trabajo' });
    }
};

export const updateOtState = async (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const [result] = await pool.query(`
            UPDATE 
                ot_states
            SET
                description = IFNULL(?, description)
            WHERE
                id_ot_state = ?;
        `, [description, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Estado de orden de trabajo no encontrado' });
        }

        const [rows] = await pool.query(`
            SELECT
                *
            FROM
                ot_states
            WHERE
                id_ot_state = ?
        `, [id]);

        res.status(200).json({ message: 'Estado de orden de trabajo actualizado exitosamente', ot_state: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el estado de orden de trabajo' });
    }
};

export const deleteOtState = async (req, res) => {
    try {
        const [result] = await pool.query(`
            DELETE FROM ot_states WHERE id_ot_state = ?;
        `, [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Estado de orden de trabajo no encontrado' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el estado de orden de trabajo' });
    }
};