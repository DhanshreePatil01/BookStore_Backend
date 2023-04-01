import express from 'express';
import * as WishListController from '../controllers/WishList.controller'
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to wishlist
router.post("/:id",userAuth,WishListController.addToWishList)

//route to remove book from wishlist
router.post("/remove/:id",userAuth,WishListController.removeFromWishList)

export default router;