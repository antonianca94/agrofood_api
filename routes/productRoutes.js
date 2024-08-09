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
