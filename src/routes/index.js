import express from 'express';
import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const router = express.Router();

const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  
  //route for users
  router.use('/users', userRoute);
  
  //route for books
  router.use('/books',bookRoute);
  
  //route for cart
  router.use('/cart', cartRoute);

  return router;
};

export default routes;
