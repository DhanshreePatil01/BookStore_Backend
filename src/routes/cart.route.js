import express from 'express';
import * as CartController from '../controllers/cart.controller'
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add book to cart
router.post("/:id", userAuth, CartController.addToCart)

//route to remove book to cart
router.put("/remove/:id", userAuth, CartController.removeBook)

//route to purchase book
router.put("/purchase/:id", CartController.purchaseBook)

export default router;