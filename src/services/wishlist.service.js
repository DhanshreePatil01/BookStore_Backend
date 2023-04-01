// import getBook from "./book.service"
import Book from '../models/book.model';
import Wishlist from "../models/Wishlist.model"
import HttpStatus from 'http-status-codes';

//service to add book to wishlist
export const addToWishList = async (userID, bookId) => {

    //check if wishlist exists
    const isWishList = await Wishlist.findOne({ 'userID': userID })

    //search the book
    const searchBook = await Book.findOne({ _id: bookId })

    let updatedWishList
    let temp = false
    const bookDetails = {
        'productID': searchBook._id,
        'description': searchBook.description,
        'bookName': searchBook.bookName,
        'bookImage': searchBook.bookImage,
        'author': searchBook.author,
        'quantity': 1,
        'price': searchBook.price
    }
    if (isWishList) {
        isWishList.books.forEach((x) => {
            if (x.productID == searchBook._id) {
                temp = true;
            }
        })
        //if book is not there in wishlist it will add it.
        if (temp == false) {
            isWishList.books.push(bookDetails)
            console.log("Added to wishlist");

            //returns updated wishlist
            updatedWishList = await Wishlist.findOneAndUpdate({ userID: userID }, { books: isWishList.books }, { new: true })
            return updatedWishList
        } else {
            return { message: "WishList already contains book"};
          
        }

    } else {
        //if wishlist is not there then it will create new wishlist
        const newWishList = await Wishlist.create(
            {
                userID: userID,
                books: bookDetails
            }
        );
        return newWishList
    }
}

//service to remove book to wishlist
export const removeFromWishList = async (userID, bookId) => {

    //check if wishlist exists
    const isWishList = await Wishlist.findOne({ 'userID': userID })

    //Search the book
    const searchBook = await Book.findOne({ _id: bookId })

    let bookToRemove
    let flag = false

    isWishList.books.forEach((book) => {
        if (book.productID == searchBook._id) {
            bookToRemove = book
            flag = true
        }
    })
    if (flag == false) {
        return { status: HttpStatus.BAD_REQUEST, message: "book already removed." };
    }

    let indexValue = isWishList.books.findIndex(x => x == bookToRemove)
    await isWishList.books.splice(indexValue, 1)

    //returns updated wishlist
    const data = await Wishlist.findOneAndUpdate({ userID: userID }, { books: isWishList.books }, { new: true })
    return data
}