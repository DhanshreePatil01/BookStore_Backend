import express from 'express';
import * as BookController from '../controllers/Book.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//Route to get all Books
router.get("", userAuth, BookController.getAllBooks)

//Route to get a Book by id
router.get('/:_id',userAuth, BookController.getBook)

export default router;