const db = require('../config/database');

exports.getAllRoles = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM roles");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
