const db = require('../config/database');

exports.getImageOfProduct = async (req, res) => {
    const product_id = req.params.product_id;
    try {
        const [rows] = await db.query("SELECT * FROM images WHERE products_id = ?", [product_id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Imagem não encontrada' });
        }
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};