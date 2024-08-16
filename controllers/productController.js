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

exports.getAllProductsByUserId = async (req, res) => {
    try {
        let products;
        const userId = parseInt(req.params.user_id); // Obtém o user_id do parâmetro de rota

        // Consulta para listar os produtos associados ao user_id
        const [rows] = await db.query(
            `SELECT 
                p.id, 
                p.sku, 
                p.name, 
                p.price, 
                p.quantity, 
                cp.name AS category_name 
            FROM products p
            INNER JOIN categories_products cp 
                ON p.categories_products_id = cp.id
            WHERE p.users_id = ?`,
            [userId]
        );
        products = rows;

        res.json({
            success: true,
            data: products,
        });

    } catch (error) {
        console.error(error); // Log do erro para diagnóstico
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

