const db = require('../config/database');

exports.getAllProducts = async (req, res) => {
    try {
        let products;

        const [rows] = await db.query(
            `SELECT 
                products.id, 
                products.sku, 
                products.name, 
                products.price, 
                products.quantity, 
                categories_products.name AS category_name 
            FROM products 
            INNER JOIN categories_products 
            ON products.categories_products_id = categories_products.id`
        );
        products = rows;
        
        res.json({
            success: true,
            data: products,
        });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
};

exports.getProductBySku = async (req, res) => {
    const sku = req.params.sku;
    try {
        const [rows] = await db.query("SELECT * FROM products WHERE sku = ?", [sku]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

