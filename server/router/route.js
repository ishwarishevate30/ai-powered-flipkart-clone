import express from 'express';
import {getProducts, getProductById, getProductReviewIntelligence} from '../controller/product_controller.js';
import {userSignup, userLogin} from '../controller/user-controller.js';
import { getSupportFAQs } from '../controller/support_controller.js';

const router = express.Router();
router.post('/signup', userSignup);
router.post('/login', userLogin);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.get('/product/:id/review-intelligence', getProductReviewIntelligence);
router.post('/faqs', getSupportFAQs);


export default router;
  