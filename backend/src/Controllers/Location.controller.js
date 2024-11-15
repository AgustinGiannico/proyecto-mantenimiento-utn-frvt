import { pool } from '../config/db.js';

export const getLocations = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                locations.id_location, 
                locations.name, 
                locations.postal_code, 
                provinces.name AS "province" 
            FROM 
                locations 
            JOIN 
                provinces ON locations.id_province = provinces.id_province
            ORDER BY 
                id_location;
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener las localidades:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const getLocation = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(`
            SELECT 
                locations.id_location, 
                locations.name, 
                locations.postal_code, 
                provinces.name AS "province" 
            FROM 
                locations 
            JOIN 
                provinces ON locations.id_province = provinces.id_province
            WHERE 
                id_location = ?;
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Localidad no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la localidad:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const createLocation = async (req, res) => {
    const { name, postal_code, id_province } = req.body;

    try {
        const [rows] = await pool.query(`
            INSERT INTO locations (name, postal_code, id_province) 
            VALUES (?, ?, ?);
        `, [
            name, 
            postal_code, 
            id_province
        ]);

        res.status(201).json({
            id: rows.insertId,
            name,
            postal_code,
            id_province
        });
    } catch (error) {
        console.error('Error al crear la localidad:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const updateLocation = async (req, res) => {
    const { id } = req.params;
    const { name, postal_code, id_province } = req.body;

    try {
        const [result] = await pool.query(`
            UPDATE locations 
            SET 
                name = IFNULL(?, name),
                postal_code = IFNULL(?, postal_code),
                id_province = IFNULL(?, id_province)
            WHERE id_location = ?;
        `, [
            name,
            postal_code,
            id_province,
            id
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Localidad no encontrada' });
        }

        const [rows] = await pool.query(`
            SELECT * 
            FROM locations 
            WHERE id_location = ?;
        `, [id]);

        res.status(200).json({ message: 'Localidad actualizada exitosamente', location: rows[0]});
    } catch (error) {
        console.error('Error al actualizar la localidad:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const deleteLocation = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query(`
            DELETE FROM locations 
            WHERE id_location = ?;
        `, [id]);

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: 'Localidad no encontrada' });
        }

        res.status(200).json({ message: 'Localidad eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la localidad:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};