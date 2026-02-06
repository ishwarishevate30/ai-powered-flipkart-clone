import express from 'express';
import {getProducts, getProductById} from '../controller/product_controller.js';
import {userSignup, userLogin} from '../controller/user-controller.js';

const router = express.Router();
router.post('/signup', userSignup);
router.post('/login', userLogin);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);


export default router;
  