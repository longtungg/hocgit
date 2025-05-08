const express = require('express');
const authenToken = require('../middleware/authenticateToken');
const StatisticController = require('../controller/statisticController');

const router = express.Router();
/**
 * @swagger
 * /statistic:
 *   get:
 *     summary: Lấy thống kê
 *     description: Lấy thống kê
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Lỗi Request, dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy
 */
router.get("/statistic", authenToken, StatisticController.getStaistic);

module.exports = router;