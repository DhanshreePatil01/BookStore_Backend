import * as BookService from '../services/book.service';
import HttpStatus from 'http-status-codes';

//Controller for get All Books
export const getAllBooks = async (req, res, next) => {
    try {
      // console.log(req.params,"-------------------req.params");
        const data = await BookService.getAllBooks(req.body);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'All Books fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};

//Controller to get a book by id
export const getBook = async (req, res, next) => {
    try {
        const data = await BookService.getBook(req.params._id,req);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Book fetched successfully'
        });
    } catch (error) {
        next(error);
    }
};