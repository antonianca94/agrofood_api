const db = require('../config/database');

exports.updateUserPartially = async (req, res) => {
    const { id } = req.params; // Obter o ID do usuário a partir dos parâmetros da rota
    const updates = ['username', 'password', 'name', 'surname', 'cpf', 'roles_id'];
    
    // Obter os dados do corpo da requisição
    const values = updates
        .filter(field => req.body[field]) // Filtra os campos que existem no corpo da requisição
        .map(field => req.body[field]); // Mapeia os campos para os seus valores

    // Verifica se o ID foi enviado
    if (!id) {
        return res.status(400).json({ message: "ID do usuário é obrigatório" });
    }

    // Verifica se existe ao menos um campo para atualizar
    if (values.length === 0) {
        return res.status(400).json({ message: "Nenhum campo para atualizar" });
    }

    // Cria a query dinamicamente
    const fieldsToUpdate = updates
        .filter(field => req.body[field]) // Filtra os campos que existem no corpo da requisição
        .map(field => `${field} = ?`) // Cria a string para a query
        .join(', '); // Junta os campos para a query

    // Adiciona o ID ao final da lista de valores
    values.push(id);

    const query = `UPDATE users SET ${fieldsToUpdate} WHERE id = ?`;

    try {
        // Executa a query com os campos e valores dinâmicos
        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        res.json({ message: "Usuário atualizado parcialmente com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar o usuário: " + err.message });
    }
};


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
