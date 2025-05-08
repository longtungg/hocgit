const Book = require('../models/bookModel');
const Borrow = require('../models/borrowingModel');
const User = require('../models/userModel');

class StatisticService {
    constructor(Book, Borrow, User) {
        this.Book = Book;
        this.Borrow = Borrow;
        this.User = User;
    }
    async getStatistic() {

        const countBook = await this.Book.find();
        const totalBook = countBook.reduce((sum, book) => sum + book.totalBook, 0 );
        const totalBookAvailable = countBook.reduce((sum, book) => sum + book.availableBook, 0 );
        const countUser = await this.User.countDocuments();
        const booksBorrowed = countBook.reduce((sum, book) => sum + book.borrowBook, 0 );
        const booksReturned = await this.Borrow.countDocuments({ status: 'Đã trả' });

        return {
            code: 200,
            message: 'Lấy thành công thống kê',
            data: {
                tongSoSach: totalBook,
                tongUser: countUser,
                soSachDangMuon: booksBorrowed,
                soSachDaTra: booksReturned,
                soSachConSan: totalBookAvailable,
            }
        };
}
}

module.exports = StatisticService;

