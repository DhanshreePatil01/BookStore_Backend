import * as WishListService from '../services/wishlist.service'
import HttpStatus from 'http-status-codes';

//Controller to add book to wishlist
export const addToWishList = async (req, res, next) => {
    try {
        const data = await WishListService.addToWishList(req.body.userID, req.params.id)
            res.status(HttpStatus.ACCEPTED).json({
                code: HttpStatus.ACCEPTED,
                data: data,
                message: 'Added book to wishlist successfully'
            });  
        }
     catch (error) {
        next(error);
    }
};

//Controller to remove book to wishlist
export const removeFromWishList = async (req, res, next) => {
    try {
        const data = await WishListService.removeFromWishList(req.body.userID, req.params.id)
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'Removed book from wishlist successfully'
        });
    }
    catch (error) {
        next(error);
    }
};