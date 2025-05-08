const express = require('express');
const UserController = require('../controller/userController.js');
const refreshTokenHandler = require('../middleware/refreshToken.js');
const { loginValidator, signupValidator, changePassValidator } = require('../validator/userValidator.js');
const validateResult = require('../middleware/validateRequest');
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
 *               password:
 *                 type: string 
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
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string 
 *       400:
 *         description: Lỗi request
 *       401:
 *         description: Thông tin đăng nhập không hợp lệ
 */

router.post("/login", loginValidator, validateResult, UserController.login);

/**
 * @swagger 
 * /signup:
 *   post:
 *     summary: Đăng ký tài khoản
 *     description: Đăng ký tài khoản
 *     requestBody:
 *       required: true
 *       description: Nhập thông tin
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
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
 *                 message:
 *                   type: string
 *       400:
 *         description: Lỗi request
 *       401:
 *         description: Đã có tài khoản
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
 *               newPassword:
 *                 type: string
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
 *                 message:
 *                   type: string
 *       400:
 *         description: Lỗi request
 *       401:
 *         description: Không có quyền (token sai hoặc thiếu)
 */
router.put("/changepass",  authenToken, changePassValidator, validateResult, UserController.changePass);

router.post("/refresh", refreshTokenHandler);

module.exports = router;