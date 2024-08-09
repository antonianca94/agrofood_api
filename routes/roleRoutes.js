const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Rota para listar roles
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Retorna a lista de Roles
 *     responses:
 *       200:
 *         description: Lista de Roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get('/', roleController.getAllRoles);

module.exports = router;
