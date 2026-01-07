import Product from './model/productSchema.js';
import { products } from './data.js';

const DefaultData = async () => {
  try {
    await Product.deleteMany(); // Remove all existing data
    await Product.insertMany(products); // Insert original data
    console.log('Default data inserted successfully');
  } catch (error) {
    console.log('Error while inserting default data: ', error.message);
  }
};

export default DefaultData;