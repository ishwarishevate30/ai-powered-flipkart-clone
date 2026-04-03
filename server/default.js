import Product from './model/productSchema.js';
import { products } from './data.js';

const DefaultData = async () => {
  try {
    const existingCount = await Product.countDocuments();

    if (existingCount > 0) {
      console.log('Default data already exists, skipping seed');
      return;
    }

    await Product.insertMany(products); // Insert original data
    console.log('Default data inserted successfully');
  } catch (error) {
    console.log('Error while inserting default data: ', error.message);
  }
};

export default DefaultData;