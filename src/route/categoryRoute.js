const express = require('express');
const authenToken = require('../middleware/authenticateToken');
const { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require('../validator/categoryValidator');
const validateResult = require('../middleware/validateResult');
const CategoryController = require('../controller/categoryController');

const router = express.Router();
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Tạo thể loại
 *     description: Tạo thể loại mới trong hệ thống
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               category:
 *                 type: string
 *                 example: "Kinh dị"
 *               description:
 *                 type: string
 *                 example: "Thể loại phim kinh dị"
 *     responses:
 *       200:
 *         description: Tạo thành công
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
 *                   example: "Tạo thể loại thành công"
 *       400:
 *         description: Lỗi Request, dữ liệu không hợp lệ
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
 *       404:
 *         description: Đã có thể loại 
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
 *                   example: "Đã có thể loại "
 */

router.post("/category", authenToken, createCategoryValidator, validateResult, CategoryController.createCategory);
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Lấy danh sách thể loại
 *     description: Lấy tất cả thể loại trong hệ thống
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
 *                   example: "Lấy thể loại thành công"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "68103a91796d53f59df0346c"
 *                       category:
 *                         type: string
 *                         example: "Kinh dị"
 *       400:
 *         description: Lỗi Request, dữ liệu không hợp lệ
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
 *       404:
 *         description: Không tìm thấy
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
 *                   example: "Không tìm thấy"
 */
router.get("/category", authenToken, CategoryController.getCategory);
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Xóa thể loại
 *     description: Xóa thể loại khỏi hệ thống theo ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "6810399c796d53f59df0345e"
 *         description: ID thể loại
 *     responses:
 *       200:
 *         description: Xóa thành công
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
 *                   example: "Xóa thể loại thành công"
 *       400:
 *         description: Lỗi Request, dữ liệu không hợp lệ
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
 *       404:
 *         description: Không tìm thấy
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
 *                   example: "Không tìm thấy thể loại"
 */

router.delete("/category/:id", deleteCategoryValidator, validateResult, authenToken, CategoryController.deleteCategory);
/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Sửa thể loại
 *     description: Sửa thông tin thể loại theo ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "6810399c796d53f59df0345e"
 *         description: ID thể loại
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object 
 *             properties:
 *               category:
 *                 type: string
 *                 example: "Kinh dị"
 *               description:
 *                 type: string
 *                 example: "Thể loại đáng sợ"
 *     responses:
 *       200:
 *         description: Sửa thành công
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
 *                   example: "Sửa thể loại thành công"
 *       400:
 *         description: Lỗi Request, dữ liệu không hợp lệ
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
 *       404:
 *         description: Không tìm thấy
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
 *                   example: "Không tìm thấy thể loại"
 */
router.put("/category/:id", authenToken, updateCategoryValidator, validateResult, CategoryController.updateCategory);

module.exports = router;

