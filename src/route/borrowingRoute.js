const express = require('express');
const authenToken = require('../middleware/authenticateToken');
const { borrowBookValidator, returnBookValidator, confirmReturnValidator } = require('../validator/borrowValidator');
const validateResult = require('../middleware/validateResult');
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
 *           example: "68103a91796d53f59df0346c"
 *         description: ID sách
 *     responses:
 *       200: 
 *         description: Mượn sách thành công
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
 *                   example: "Mượn sách thành công"
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
router.post("/borrow/:bookId", authenToken, borrowBookValidator, validateResult, BorrowController.borrowingBook);
/**
 * @swagger
 * /borrow/{bookId}:
 *   put:
 *     summary: Trả sách
 *     description: Trả sách
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *           example: "68103a91796d53f59df0346c"
 *         description: ID sách
 *     responses:
 *       200: 
 *         description: Chờ ADMIN xác nhận 
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
 *                   example: "Chờ ADMIN xác nhận"
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
 *       404:
 *         description: Bạn không mượn sách này
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
 *                   example: "Bạn không mượn sách này"
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
 *           example: "681c278f0640e80f738658ed"
 *         description: ID mượn
  *     responses:
 *       200: 
 *         description: Xác nhận thành công
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
 *                   example: "Xác nhận thành công"
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
 *       404:
 *         description: Chưa có yêu cầu trả sách
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
 *                   example: "Chưa có yêu cầu trả sách"
 */
router.put("/confirm/:borrowId", authenToken,confirmReturnValidator, validateResult, BorrowController.confirmReturn);

module.exports = router;