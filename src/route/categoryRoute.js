const express = require('express');
const authenToken = require('../middleware/authenticateToken');
const { createCategoryValidator, updateCategoryValidator, deleteCategoryValidator } = require('../validator/categoryValidator');
const validateResult = require('../middleware/validateRequest');
const CategoryController = require('../controller/categoryController');

const router = express.Router();
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Tạo thể loại
 *     description: Tạo thể loại
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
 *               description:
 *                 type: string
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
 *                 message:
 *                   type: string
 *       400:
 *         description: Lỗi Request, dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy
 */
router.post("/category", authenToken, createCategoryValidator, validateResult, CategoryController.createCategory);
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Lấy thể loại
 *     description: Lấy thể loại
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
router.get("/category", authenToken, CategoryController.getCategory);
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Xóa thể loại
 *     description: Xóa thể loại
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID thể loại
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       400:
 *         description: Lỗi Request, dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy
 */

router.delete("/category/:id", deleteCategoryValidator, validateResult, authenToken, CategoryController.deleteCategory);
/**
 * @swagger
 * /category/{id}:
 *   put:
 *     summary: Sửa thể loại
 *     description: Sửa thể loại
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *               description:
 *                 type: string
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
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Lỗi Request, dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy
 */

router.put("/category/:id", authenToken, updateCategoryValidator, validateResult, CategoryController.updateCategory);

module.exports = router;

