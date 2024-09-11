const db = require('../config/database');

// Função para obter os detalhes do usuário a partir da view `user_details`
exports.getUserDetailsById = async (req, res) => {
    const userId = req.params.id;
    try {
        // Consultar a view `user_details` com base no ID do usuário
        const [userDetails] = await db.query('SELECT * FROM user_details WHERE user_id = ?', [userId]);

        if (userDetails.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Retornar os detalhes do usuário
        res.json(userDetails[0]);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar detalhes do usuário' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT users.*, roles.name AS role_name FROM users INNER JOIN roles ON users.roles_id = roles.id");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json({ message: "Usuário deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            "SELECT users.*, roles.name AS role_name FROM users INNER JOIN roles ON users.roles_id = roles.id WHERE users.id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
