import Product from '../model/productSchema.js';   


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("Fetched products from database:", products); // Debugging log
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log("Fetched product by id:", product);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by id:", error);
        res.status(500).json({ message: error.message });
    }
};
