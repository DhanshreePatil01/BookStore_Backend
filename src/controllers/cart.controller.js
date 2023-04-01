import * as CartService from '../services/cart.service'
import HttpStatus from 'http-status-codes';

//Controller for add book to cart
export const addToCart = async (req, res, next) => {
    try {
      const data = await CartService.addedToCart(req.body.userID,req.params.id)
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Added to cart successfully'
        });
    } catch (error) {
        next(error);
    }
};

//Controller for remove book from cart
export const removeBook = async (req, res, next) => {
    try {
      const data = await CartService.removeBook(req.body.userID,req.params.id)
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Removed book successfully'
        });
    } catch (error) {
        next(error);
    }
};

//Controller for pruchase book
export const purchaseBook = async (req, res, next) => {
    try {
      const data = await CartService.purchaseBook(req.params.id)
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Order Purchased successfully'
        });
    } catch (error) {
        next(error);
    }
};