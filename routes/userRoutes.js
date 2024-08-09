const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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

module.exports = router;
