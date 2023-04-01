import Book from '../models/book.model';

//service for get all books
export const getAllBooks = async (body) => {
    const data = await Book.find();
    return data;
};

//service for get a book by id
export const getBook = async (id) => {
    const data = await Book.findOne({_id:id})
    return data
}
