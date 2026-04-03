import { getSupportAnswer } from '../utils/support-knowledge.js';

export const getSupportFAQs = async (req, res) => {
    try {
        const { message = '', context = {} } = req.body || {};

        if (!String(message).trim()) {
            return res.status(400).json({ message: 'Message is required.' });
        }

        const result = getSupportAnswer({ message: String(message), context });

        return res.status(200).json({
            ...result,
            createdAt: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error in support FAQs:', error);
        return res.status(500).json({ message: error.message });
    }
};
