import Cart from "../models/Cart.model"
import { getBook } from "./book.service"
import Book from "../models/book.model";
import HttpStatus from 'http-status-codes';


//service to add book to users cart
export const addedToCart = async (userID, bookId) => {

   const searchBook = await getBook(bookId)
   //if book is not present
   if (!searchBook) {
      return { error: 0, status: HttpStatus.OK, message: "Book Not found." };

   }

   //if book quantity is less than 1
   if (searchBook.quantity < 1) {
      return { error: 0, status: HttpStatus.OK, message: "Book is not available right now !!!." };

   }

   //for checking user cart is exist or not
   const existingCart = await Cart.findOne({ 'userID': userID, isPurchased: false })

  // let totalOfBooks = 0
   let total
   let quantity
   let bookFound = false
   let bookDetailsInput = {
      'productID': searchBook._id,
      'description': searchBook.description,
      'bookName': searchBook.bookName,
      'bookImage': searchBook.bookImage,
      'author': searchBook.author,
      'quantity': 1,
      'price': searchBook.price
   }

   //if cart already exist it updates the book quantity 
   if (existingCart) {

      total = existingCart.cartTotal
      existingCart.books.forEach(book => {
         if (book.productID == bookId) {
            bookFound = true
            quantity = book.quantity
            book.quantity = quantity + 1
            total = total + book.price
         }
      });

      //if new book added to cart it updates the cart total by adding price of book to total
      if (bookFound == false) {
         existingCart.books.push(bookDetailsInput)
         total = total + searchBook.price
         console.log("Inserted succesfully");
      }

      let cart1 = await Cart.findOneAndUpdate({ userID: userID }, { books: existingCart.books, cartTotal: total }, { new: true })
      let bookData = await Book.findById(bookId)
      let quantityOfBookStore = bookData.quantity
      console.log("Quantity Of Book in Db-->",quantityOfBookStore );
      await Book.findByIdAndUpdate({ '_id': bookId }, { quantity: quantityOfBookStore - 1 })
      return cart1
   } else {
      //if cart is not present creates a new cart
      const newCart = await Cart.create({
         userID: userID
         ,
         books: [bookDetailsInput]
         ,
         cartTotal: searchBook.price
         ,
         isPurchased:false
      })
      console.log("created cart", newCart);
      return newCart
   }
}

export const removeBook = async (userID, bookId) => {
   const existingCart = await Cart.findOne({ userID: userID, isPurchased: false });

   //if cart doesn't exist, return error
   if (!existingCart) {
      throw new Error("Cart not found....");
   }

   //find the book in the cart
   const bookIndex = existingCart.books.findIndex(book => book.productID === bookId);

   //if book not found in cart, return error
   if (bookIndex === -1) {
      throw new Error("Book not found in cart...");
   }

   const bookToRemove = existingCart.books[bookIndex];

   //if quantity of book is more than 1, decrease the quantity by 1
   if (bookToRemove.quantity > 1) {
      bookToRemove.quantity -= 1;
   } 
   else {
      //if quantity of book is 1, remove the book from the cart
      existingCart.books.splice(bookIndex, 1);
   }

   const total = existingCart.cartTotal - bookToRemove.quantity * bookToRemove.price;

   //update the cart with the new book quantity and cart total
   const updatedCart = await Cart.findOneAndUpdate({ userID: userID }, { books: existingCart.books, cartTotal: total }, { new: true });

   //update the book quantity in the book collection
   const bookData = await Book.findById(bookId);
   const quantityOfBookStore = bookData.quantity;
   await Book.findByIdAndUpdate({ '_id': bookId }, { quantity: quantityOfBookStore + 1 });

   return updatedCart;
};

 //service to purchase book
export const purchaseBook = async (userID) => {

   const userCart = Cart.findOneAndUpdate({ '_id': userID }, { isPurchased: true }, { new: true })

   return userCart;
}
