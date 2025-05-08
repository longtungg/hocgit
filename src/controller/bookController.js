const BookService = require('../service/bookService');
const LogService = require('../service/logService');
const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Log = require('../models/logModel');
const Category = require('../models/categoryModel');
const bookServiceInstance = new BookService(Book, User, Category);
const logServiceInstance = new LogService(Log);

class BookController {
    constructor(bookServiceInstance, logServiceInstance) {
        this.bookServiceInstance = bookServiceInstance;
        this.logServiceInstance = logServiceInstance;
    }
    getBook = async (req, res) => {
       const result = await bookServiceInstance.getBookService();
       if(result.code !== 200) {
        return res.status(result.code).json({
            code : result.code,
            message : result.message,
        })
       } else
        return res.status(200).json({
            code : 200,
            message : result.message,
            data : result.data,
        })
    }
    createBook = async (req, res) => {
        const {namebook, author, year, description, poster, totalBook, category} = req.body;
        // const poster = req.file ? req.file.path : '';
        const id = req.user?.id;
        const result = await bookServiceInstance.createBookService({id, namebook, author, year, description, poster, totalBook, category});
        if(result.code !== 200) {
            return res.status(result.code).json({
                code : result.code,
                message : result.message,
            })
           } else {
            await logServiceInstance.CreateLog({userId : id, bookId : result.data._id, action : 'Tạo sách',});
            return res.status(200).json({
                code : 200,
                message : result.message,
                data : result.data,
            })
        }
    }
    deleteBook = async (req, res) => {
        const { id } = req.params;
        const result = await bookServiceInstance.deleteBookService({id});
        if(result.code !== 200) {
         return res.status(result.code).json({
             code : result.code,
             message : result.message,
         })
        } else {
         await logServiceInstance.CreateLog({userId : req.user?.id, bookId : id, action : 'Xóa sách',});
         return res.status(200).json({
             code : 200,
             message : result.message,
         })
    }
}
    updateBook = async (req, res) => {
        const {id} = req.params;
        const userId = req.user?.id;
        const {namebook, author, year, description, poster, totalBook, category} = req.body;
        const result = await bookServiceInstance.updateBookService({id, userId, namebook, author, year, description, poster, totalBook, category});
        if(result.code !== 200) {
            return res.status(result.code).json({
                code : result.code,
                message : result.message,
            })
           } else { 
            await logServiceInstance.CreateLog({userId : userId, bookId : id, action : 'Sửa sách',});
            return res.status(200).json({
                code : 200,
                message : result.message,
                data : result.data,
            })
    }
    }
    searchBook = async (req, res) => {
        const {query} = req.params;

        const result = await bookServiceInstance.searchBookService({ query });
        if(result.code !== 200) {
            return res.status(result.code).json({
                code : result.code,
                message : result.message,
            })
           } else
            return res.status(200).json({
                code : 200,
                message : result.message,
                data : result.data,
            })
    }
}

module.exports = new BookController(bookServiceInstance, logServiceInstance);;