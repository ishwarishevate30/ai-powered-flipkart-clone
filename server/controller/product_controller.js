import Product from '../model/productSchema.js';   
import { getReviewIntelligence } from '../utils/review-intelligence.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiClient = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null;

const generateGeminiReviewIntelligence = async (product) => {
    if (!geminiClient) {
        throw new Error('GEMINI_API_KEY is missing');
    }

    const model = geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const reviews = Array.isArray(product?.reviews) ? product.reviews : [];

    const normalizedReviews = reviews.map((review) => ({
        rating: Number(review?.rating || 0),
        comment: String(review?.comment || '').trim(),
        verified: Boolean(review?.verified)
    }));

    const prompt = `
You are analyzing ecommerce product reviews.
Respond with ONLY valid JSON and no markdown.
Required JSON schema:
{
  "sentiment": "POSITIVE | NEUTRAL | NEGATIVE",
  "summary": "short paragraph",
  "pros": ["string"],
  "cons": ["string"],
  "risks": ["string"]
}

Product title: ${product?.title?.longTitle || product?.title?.shortTitle || 'Unknown Product'}
Review data: ${JSON.stringify(normalizedReviews)}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const parsed = JSON.parse(text);

    return {
        sentiment: parsed.sentiment || 'NEUTRAL',
        summary: parsed.summary || 'No summary available.',
        pros: Array.isArray(parsed.pros) ? parsed.pros : [],
        cons: Array.isArray(parsed.cons) ? parsed.cons : [],
        risks: Array.isArray(parsed.risks) ? parsed.risks : []
    };
};

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

export const getProductReviewIntelligence = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const localIntelligence = getReviewIntelligence(product);

        try {
            const geminiIntelligence = await generateGeminiReviewIntelligence(product);

            return res.status(200).json({
                productId: product.id,
                productTitle: product.title.longTitle,
                reviews: product.reviews || [],
                source: 'gemini',
                intelligence: {
                    ...localIntelligence,
                    ai: geminiIntelligence
                }
            });
        } catch (geminiError) {
            console.error('Gemini review analysis failed, using fallback:', geminiError.message);
        }

        return res.status(200).json({
            productId: product.id,
            productTitle: product.title.longTitle,
            reviews: product.reviews || [],
            source: 'local-fallback',
            intelligence: localIntelligence
        });
    } catch (error) {
        console.error('Error building review intelligence:', error);
        return res.status(500).json({ message: error.message });
    }
};
