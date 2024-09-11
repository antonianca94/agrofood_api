const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um usuário pelo ID
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser atualizado
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         description: Tipo de conteúdo
 *         schema:
 *           type: string
 *           default: application/json
 *       - in: body
 *         name: body
 *         required: true
 *         description: Dados do usuário a serem atualizados parcialmente
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             name:
 *               type: string
 *             roles_id:
 *               type: integer
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Nenhum dado para atualizar
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar o usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               roles_id:
 *                 type: integer
 */
router.patch('/:id', userController.updateUserPartially);

/**
 * @swagger
 * /users/details/{id}:
 *   get:
 *     summary: Retorna os detalhes de um usuário usando a view `user_details`
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário para buscar detalhes
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Detalhes do usuário retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: number
 *                 username:
 *                   type: string
 *                 name:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 role_name:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar o usuário
 */
router.get('/details/:id', userController.getUserDetailsById);

// Rota para listar usuários
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna a lista de Usuários
 *     responses:
 *       200:
 *         description: Lista de Usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   username:
 *                     type: string
 *                   password:
 *                     type: string
 *                   name:
 *                     type: string
 *                   surname:
 *                     type: string
 *                   cpf:
 *                     type: string
 *                   roles_id:
 *                     type: number
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser deletado
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', userController.deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorna um usuário pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do usuário a ser retornado
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Usuário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *                 name:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 cpf:
 *                   type: string
 *                 roles_id:
 *                   type: number
 *                 role_name:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao buscar o usuário
 */
router.get('/:id', userController.getUserById);

module.exports = router;
