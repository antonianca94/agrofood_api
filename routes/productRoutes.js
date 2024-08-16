const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Rota para listar produtos
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna a lista de produtos
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sku:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 */
router.get('/', productController.getAllProducts);

// Rota para listar produtos com base no user_id
/**
 * @swagger
 * /products/user_id/{user_id}:
 *   get:
 *     summary: Retorna a lista de produtos filtrados pelo user_id do usuário
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de produtos filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   sku:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: string
 *                   category_name:
 *                     type: string
 */
router.get('/user_id/:user_id', productController.getAllProductsByUserId);

// Rota para obter um produto específico
/**
 * @swagger
 * /products/{sku}:
 *   get:
 *     summary: Retorna um produto pelo SKU
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sku:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 *       404:
 *         description: Produto não encontrado
 */
router.get('/:sku', productController.getProductBySku);


module.exports = router;
