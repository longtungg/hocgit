const express = require('express');
const authenToken = require('../middleware/authenticateToken');
const StatisticController = require('../controller/statisticController');

const router = express.Router();
/**
 * @swagger
 * /statistic:
 *   get:
 *     summary: Lấy thống kê
 *     description: Lấy thống kê về sách, người dùng và mượn sách
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Lấy thành công thống kê"
 *                 data:
 *                   type: object
 *                   properties:
 *                     tongSoSach:
 *                       type: integer
 *                       example: 200
 *                     tongUser:
 *                       type: integer
 *                       example: 50
 *                     soSachDangMuon:
 *                       type: integer
 *                       example: 30
 *                     soSachDaTra:
 *                       type: integer
 *                       example: 170
 *                     soSachConSan:
 *                       type: integer
 *                       example: 100
 *       400:
 *         description: Lỗi Request, dữ liệu không hợp lệ hoặc thiếu thông tin cần thiết
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Dữ liệu không hợp lệ, vui lòng kiểm tra lại yêu cầu"
 *       404:
 *         description: Không tìm thấy tài nguyên yêu cầu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Không tìm thấy thông tin thống kê"
 */

router.get("/statistic", authenToken, StatisticController.getStaistic);

module.exports = router;