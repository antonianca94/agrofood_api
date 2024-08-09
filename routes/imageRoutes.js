const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Rota para obter uma imagem específico
/**
 * @swagger
 * /images/{product_id}:
 *   get:
 *     summary: Retorna as Imagens pelo ID do Produto
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: imagem encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   id:
 *                     type: number
 *                   name:
 *                     type: string
 *                   path:
 *                     type: string
 *                   type:
 *                     type: string
 *                   products_id:
 *                     type: number
 *      
 *       404:
 *         description: Imagem não encontrado
 */
router.get('/:product_id', imageController.getImageOfProduct);


module.exports = router;
