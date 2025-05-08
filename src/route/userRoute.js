const express = require('express');
const UserController = require('../controller/userController.js');
const refreshTokenHandler = require('../middleware/refreshToken.js');
const { loginValidator, signupValidator, changePassValidator } = require('../validator/userValidator.js');
const validateResult = require('../middleware/validateResult.js');
const authenToken = require('../middleware/authenticateToken.js');

const router = express.Router();
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Đăng nhập
 *     description: Đăng nhập và nhận token
 *     requestBody:
 *       required: true
 *       description: Thông tin đăng nhập của người dùng
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string  
 *                 example: "tung"
 *               password:
 *                 type: string
 *                 example: "tung" 
 *     responses:
 *       200: 
 *         description: Đăng nhập thành công
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
 *                   example: "Đăng nhập thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "your-access-token-here"
 *                     refreshToken: 
 *                       type: string
 *                       example: "your-refresh-token-here"
 *       400:
 *         description: Lỗi request, dữ liệu không hợp lệ hoặc thiếu thông tin đăng nhập
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
 *                   example: "Thông tin đăng nhập không hợp lệ hoặc thiếu thông tin"
 *       404:
 *         description: Người dùng không tồn tại
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
 *                   example: "Không tìm thấy người dùng với thông tin đã nhập"
 *       401:
 *         description: Thông tin đăng nhập không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Mật khẩu không đúng"
 */

router.post("/login", loginValidator, validateResult, UserController.login);

/**
 * @swagger 
 * /signup:
 *   post:
 *     summary: Đăng ký tài khoản
 *     description: Đăng ký tài khoản mới
 *     requestBody:
 *       required: true
 *       description: Nhập thông tin tài khoản
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "tung"
 *               password:
 *                 type: string
 *                 example: "tung"
 *               birthday:
 *                 type: string
 *                 format: date
 *                 example: "2002-06-03"
 *               gender:
 *                 type: string
 *                 example: "nam"
 *     responses:
 *       200: 
 *         description: Tạo tài khoản thành công
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
 *                   example: "Tạo tài khoản thành công"
 *       400:
 *         description: Lỗi request, dữ liệu không hợp lệ
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
 *                   example: "Dữ liệu không hợp lệ"
 *       401:
 *         description: Tài khoản đã tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Tài khoản đã tồn tại"
 */

router.post("/signup", signupValidator, validateResult, UserController.signUp);
/**
 * @swagger 
 * /changepass:
 *   put:
 *     summary: Đổi mật khẩu 
 *     description: Đổi mật khẩu tài khoản
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       description: Nhập thông tin
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "tung"
 *               newPassword:
 *                 type: string
 *                 example: "tung1"
 *     responses:
 *       200: 
 *         description: Đổi mật khẩu thành công
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
 *                   example: "Đổi mật khẩu thành công"
 *       400:
 *         description: Lỗi request, ví dụ mật khẩu cũ không đúng hoặc dữ liệu không hợp lệ
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
 *                   example: "Mật khẩu cũ không đúng hoặc dữ liệu không hợp lệ"
 *       404:
 *         description: Không tồn tại tài khoản
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
 *                   example: "Không tồn tại tài khoản"
 */

router.put("/changepass",  authenToken, changePassValidator, validateResult, UserController.changePass);

router.post("/refresh", refreshTokenHandler);

module.exports = router;