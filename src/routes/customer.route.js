import express from 'express';
import * as customerDetailsController from "../controllers/customer.controller";
import { newCustomerValidator } from "../validators/customer.validator";
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to add customer address details
router.post('/', userAuth, customerDetailsController.addAddress);

export default router;