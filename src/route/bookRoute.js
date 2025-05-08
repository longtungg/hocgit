const express = require('express');
const authenToken = require('../middleware/authenticateToken');
const router = express.Router();
const upload = require('../middleware/multer');
const multer = require('multer');
const { createBookValidator, updateBookValidator, deleteBookValidator } = require('../validator/bookValidator');
const validateResult = require('../middleware/validateRequest');
// upload.single('poster')

const BookController = require('../controller/bookController');
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Tạo sách
 *     description: Tạo sách
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               namebook:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *               description:
 *                 type: string
 *               poster:
 *                 type: string
 *               totalBook:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo sách thành công
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
 *         description: Lỗi Request
 *       404:
 *         description: Không tìm thấy sách
 */

router.post("/books", authenToken, createBookValidator, validateResult, BookController.createBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Xóa sách
 *     description: Xóa sách khỏi hệ thống
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sách
 *     responses:
 *       200: 
 *         description: Xóa sách thành công
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
 *       404:
 *         description: Không tìm thấy sách
 */
router.delete("/books/:id", authenToken, deleteBookValidator, validateResult, BookController.deleteBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Sửa sách
 *     description: Cập nhật thông tin sách theo ID
 *     security:
 *         - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của sách cần sửa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               namebook:
 *                 type: string
 *               author:
 *                 type: string
 *               year:
 *                 type: integer
 *               description:
 *                 type: string
 *               poster:
 *                 type: string
 *               totalBook:
 *                 type: integer
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sửa sách thành công
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
 *         description: Lỗi Request
 *       404:
 *         description: Không tìm thấy sách
 */
router.put("/books/:id", authenToken, updateBookValidator, validateResult, BookController.updateBook);

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Lấy danh sách sách
 *     description: Trả về danh sách tất cả sách trong thư viện
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       namebook:
 *                         type: string
 *                       author:
 *                         type: string
 *                       year:
 *                         type: integer
 *                       description:
 *                         type: string
 *                       poster:
 *                         type: string
 *                       totalBook:
 *                         type: integer
 *                       category:
 *                         type: string
 *       404:
 *         description: Không tìm thấy sách
 *       400:
 *         description: Lỗi Request
 */

router.get("/books", authenToken, BookController.getBook);


/**
 * @swagger
 * /books/{query}:
 *   get:
 *     summary: Tìm kiếm sách
 *     description: Tìm sách theo tên
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm
 *     responses:
 *       200:
 *         description: Thành công
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
 *       404:
 *         description: Không tìm thấy sách
 *       400:
 *         description: Lỗi Request
 */
router.get("/books/:query", authenToken, BookController.searchBook);


module.exports = router;