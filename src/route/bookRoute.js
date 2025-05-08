const express = require('express');
const authenToken = require('../middleware/authenticateToken');
const router = express.Router();
const upload = require('../middleware/multer');
const multer = require('multer');
const { createBookValidator, updateBookValidator, deleteBookValidator } = require('../validator/bookValidator');
const validateResult = require('../middleware/validateResult');
// upload.single('poster')

const BookController = require('../controller/bookController');
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Tạo sách
 *     description: Tạo sách mới trong hệ thống
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
 *                 example: "tung tung sahur"
 *               author:
 *                 type: string
 *                 example: "Tùng"
 *               year:
 *                 type: integer
 *                 example: 2002
 *               description:
 *                 type: string
 *                 example: "Một quyển sách hay"
 *               poster:
 *                 type: string
 *                 example: "https://swagger.io/docs/_astro/hero-img.CQIKAqF0_1585RE.webp"
 *               totalBook:
 *                 type: integer
 *                 example: 20
 *               category:
 *                 type: string
 *                 example: "6810399c796d53f59df0345e"
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Tạo sách thành công"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "68103a91796d53f59df0346c"
 *                     namebook:
 *                       type: string
 *                       example: "tung tung sahur"
 *                     author:
 *                       type: string
 *                       example: "Tùng"
 *                     year:
 *                       type: integer
 *                       example: 2002
 *                     description:
 *                       type: string
 *                       example: "Một quyển sách hay"
 *                     poster:
 *                       type: string
 *                       example: "https://swagger.io/docs/_astro/hero-img.CQIKAqF0_1585RE.webp"
 *                     totalBook:
 *                       type: integer
 *                       example: 20
 *                     category:
 *                       type: string
 *                       example: "6810399c796d53f59df0345e"
 *       400:
 *         description: Lỗi Request
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
 *                   example: "Lỗi Request"
 *       404:
 *         description: Sách đã tồn tại
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
 *                   example: "Sách đã tồn tại"
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
 *           example: "68103a91796d53f59df0346c"
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Xóa sách thành công"
 *       400:
 *         description: Lỗi request
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
 *                   example: "Lỗi request"
 *       401:
 *         description: Không có quyền (token sai hoặc thiếu)
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
 *                   example: "Không có quyền"
 *       404:
 *         description: Không tìm thấy sách
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
 *                   example: "Không tìm thấy sách"
 */

router.delete("/books/:id", authenToken, deleteBookValidator, validateResult, BookController.deleteBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Sửa sách
 *     description: Cập nhật thông tin sách theo ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "68103a91796d53f59df0346c"
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
 *                 example: "tung tung sahur"
 *               author:
 *                 type: string
 *                 example: "Tùng"
 *               year:
 *                 type: integer
 *                 example: 2002
 *               description:
 *                 type: string
 *                 example: "Một quyển sách hay"
 *               poster:
 *                 type: string
 *                 example: "https://swagger.io/docs/_astro/hero-img.CQIKAqF0_1585RE.webp"
 *               totalBook:
 *                 type: integer
 *                 example: 20
 *               category:
 *                 type: string
 *                 example: ["Kinh dị", "Hành động"]
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Sửa sách thành công"
 *       400:
 *         description: Lỗi Request
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
 *                   example: "Lỗi Request"
 *       404:
 *         description: Không tìm thấy sách
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
 *                   example: "Không tìm thấy sách"
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 'Lấy danh sách thành công'
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example : "68103a91796d53f59df0346c"
 *                       namebook:
 *                         type: string
 *                         example: "tung tung sahur"
 *                       author:
 *                         type: string
 *                         example: "Tùng"
 *                       year:
 *                         type: integer
 *                         example: "2002"
 *                       description:
 *                         type: string
 *                         example: "Tùng"
 *                       poster:
 *                         type: string
 *                         example: "https://swagger.io/docs/_astro/hero-img.CQIKAqF0_1585RE.webp"
 *                       totalBook:
 *                         type: integer
 *                         example: 20
 *                       category:
 *                         type: array
 *                         example : ["6810399c796d53f59df0345e"]
 *                         
 *       404:
 *         description: Không tìm thấy sách
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
 *                   example: 'Không tìm thấy sách'
 *         
 *       400:
 *         description: Lỗi Request
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
 *                   example: 'Lỗi'
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
 *           example: "tungtungtung"
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: 'Thành công'
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "68103a91796d53f59df0346c"
 *                       namebook:
 *                         type: string
 *                         example: "tung tung sahur"
 *                       author:
 *                         type: string
 *                         example: "Tùng"
 *                       year:
 *                         type: integer
 *                         example: 2002
 *                       description:
 *                         type: string
 *                         example: "Tùng"
 *                       poster:
 *                         type: string
 *                         example: "https://swagger.io/docs/_astro/hero-img.CQIKAqF0_1585RE.webp"
 *                       totalBook:
 *                         type: integer
 *                         example: 20
 *                       category:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["6810399c796d53f59df0345e"]
 *       404:
 *         description: Không tìm thấy sách
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
 *                   example: 'Không tìm thấy sách'
 *       400:
 *         description: Lỗi Request
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
 *                   example: 'Lỗi'
 */

router.get("/books/:query", authenToken, BookController.searchBook);


module.exports = router;