const express = require('express');
const authenToken = require('../middleware/authenticateToken');
const { borrowBookValidator, returnBookValidator, confirmReturnValidator } = require('../validator/borrowValidator');
const validateResult = require('../middleware/validateRequest');
const BorrowController = require('../controller/borrowingController'); 

const router = express.Router();
/**
 * @swagger
 * /borrow/{bookId}:
 *   post:
 *     summary: Mượn sách
 *     description: Mượn sách
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sách
 *     responses:
 *       200:
 *         description: Mượn sách thành công
 *       400:
 *         description: Lỗi Request
 *       404:
 *         description: Không tìm thấy sách với ID đã cho
 */
router.post("/borrow/:bookId", authenToken, borrowBookValidator, validateResult, BorrowController.borrowingBook);
/**
 * @swagger
 * /borrow/{bookId}:
 *   put:
 *     summary: Mượn sách
 *     description: Mượn sách
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sách
 *     responses:
 *       200:
 *         description: Chờ xác nhận của admin
 *       400:
 *         description: Lỗi Request
 *       404:
 *         description: Không tìm thấy sách với ID đã cho
 */
router.put("/borrow/:bookId", authenToken,returnBookValidator, validateResult, BorrowController.returnBook);
/**
 * @swagger
 * /confirm/{borrowId}:
 *   put:
 *     summary: Xác nhận trả sách
 *     description: Xác nhận trả sách
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: borrowId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID mượn
 *     responses:
 *       200:
 *         description: Xác nhận thành công
 *       400:
 *         description: Lỗi Request, có thể do thiếu ID sách hoặc dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm lich sử mượn với ID đã cho
 */
router.put("/confirm/:borrowId", authenToken,confirmReturnValidator, validateResult, BorrowController.confirmReturn);

module.exports = router;