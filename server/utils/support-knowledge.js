const policy = {
    deliveryCharge: 40,
    shippingWindow: '3 to 5 business days',
    returnWindowDays: 7,
    refundWindow: '3 to 7 business days',
    paymentMethods: ['UPI / Wallet', 'Debit / Credit Card', 'Net Banking']
};

const knowledgeBase = [
    {
        topic: 'order',
        keywords: ['order', 'place order', 'checkout', 'buy now', 'cart', 'confirm order'],
        answer: ({ context }) => {
            const cartCount = Number(context?.cartItemCount || 0);
            const cartHint = cartCount ? `I can see ${cartCount} item(s) in your flow context.` : 'Add your products to cart first.';

            return `To place an order, open Cart and click Place Order, or use Buy Now from product detail. ${cartHint} Then complete payment in the Paytm gateway page.`;
        },
        suggestions: ['How do I track my order?', 'Can I cancel after placing order?', 'What is the delivery charge?']
    },
    {
        topic: 'payment',
        keywords: ['payment', 'pay', 'upi', 'card', 'gateway', 'transaction', 'failed payment'],
        answer: () => `We support ${policy.paymentMethods.join(', ')} in the checkout gateway. If payment fails, retry once, verify network and bank limit, and place order again from cart.` ,
        suggestions: ['Why did my payment fail?', 'Is Cash on Delivery available?', 'How long does refund take?']
    },
    {
        topic: 'returns',
        keywords: ['return', 'replace', 'exchange', 'damaged', 'wrong product', 'defective'],
        answer: () => `You can request return or replacement within ${policy.returnWindowDays} days of delivery for damaged, defective, or wrong items. Keep invoice and original packaging for faster approval.`,
        suggestions: ['How do I start a return?', 'Can I replace instead of refund?', 'What items are non-returnable?']
    },
    {
        topic: 'shipping',
        keywords: ['shipping', 'delivery', 'arrive', 'track', 'courier', 'dispatch'],
        answer: () => `Standard delivery is usually ${policy.shippingWindow} and delivery charge is Rs ${policy.deliveryCharge}. Tracking is shared after dispatch from your order details.`,
        suggestions: ['How to track shipment?', 'Can I change address?', 'Do you offer express delivery?']
    },
    {
        topic: 'refund',
        keywords: ['refund', 'money back', 'credited', 'refund status', 'reversal'],
        answer: () => `After return approval, refunds are processed to original payment method in ${policy.refundWindow}. UPI refunds are usually quicker than card settlements.`,
        suggestions: ['Where can I see refund status?', 'Can refund go to different account?', 'Refund not received yet']
    },
    {
        topic: 'cancel',
        keywords: ['cancel', 'cancellation', 'stop order', 'abort order'],
        answer: () => 'You can cancel an order before it is shipped from your orders page. If already shipped, use return after delivery.',
        suggestions: ['Is cancellation free?', 'Can I cancel one item only?', 'What if order is already shipped?']
    },
    {
        topic: 'account',
        keywords: ['login', 'account', 'signup', 'password', 'profile', 'sign in'],
        answer: () => 'Use the Login button in header to sign in or create an account. If login fails, verify email/phone and retry with correct credentials.',
        suggestions: ['How do I create account?', 'How do I logout?', 'Can I update profile?']
    }
];

const normalize = (text = '') => text.toLowerCase().replace(/\s+/g, ' ').trim();

const intentBoostRules = [
    { topic: 'cancel', pattern: /\b(cancel|cancellation|stop order|abort order)\b/ },
    { topic: 'refund', pattern: /\b(refund|money back|credited|reversal)\b/ },
    { topic: 'returns', pattern: /\b(return|replace|exchange|damaged|defective)\b/ },
    { topic: 'shipping', pattern: /\b(track|tracking|shipment|courier|dispatch|delivery)\b/ },
    { topic: 'payment', pattern: /\b(payment|pay|upi|card|gateway|transaction)\b/ },
    { topic: 'account', pattern: /\b(login|sign in|signup|account|profile|password)\b/ },
    { topic: 'order', pattern: /\b(order|checkout|buy now|place order|placing order|confirm order)\b/ }
];

const hardIntentRules = [
    { topic: 'cancel', pattern: /\b(cancel|cancellation|abort|stop)\b/ },
    { topic: 'refund', pattern: /\b(refund|reversal|money back|credited)\b/ },
    { topic: 'returns', pattern: /\b(return|replace|exchange|damaged|defective)\b/ },
    { topic: 'account', pattern: /\b(login|logout|signup|sign in|password|profile|account)\b/ }
];

const toStemToken = (value = '') => {
    if (value.endsWith('ing') && value.length > 5) return value.slice(0, -3);
    if (value.endsWith('ed') && value.length > 4) return value.slice(0, -2);
    if (value.endsWith('s') && value.length > 3) return value.slice(0, -1);
    return value;
};

const tokenize = (text = '') => normalize(text)
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(toStemToken);

const matchScore = (query, keywords) => {
    const queryTokens = tokenize(query);

    return keywords.reduce((score, keyword) => {
        const normalizedKeyword = normalize(keyword);
        const keywordTokens = tokenize(normalizedKeyword);

        if (query.includes(normalizedKeyword)) {
            return score + Math.max(1, keywordTokens.length + 1);
        }

        if (!keywordTokens.length) return score;

        const tokenMatchCount = keywordTokens.filter((token) => queryTokens.includes(token)).length;

        if (!tokenMatchCount) return score;

        return score + Number((tokenMatchCount / keywordTokens.length).toFixed(2));
    }, 0);
};

const getIntentBoost = (query, topic) => {
    const boosts = intentBoostRules.filter((rule) => rule.topic === topic && rule.pattern.test(query));
    return boosts.length ? boosts.length * 3.5 : 0;
};

export const getSupportAnswer = ({ message = '', context = {} }) => {
    const query = normalize(message);

    if (!query) {
        return {
            topic: 'general',
            confidence: 0.2,
            answer: 'Ask me about orders, payment, returns, shipping, refund, or cancellation.',
            suggestions: ['How do I place order?', 'What payment methods are available?', 'How do returns work?']
        };
    }

    const forcedRule = hardIntentRules.find((rule) => rule.pattern.test(query));
    if (forcedRule) {
        const forcedTopic = knowledgeBase.find((item) => item.topic === forcedRule.topic);

        if (forcedTopic) {
            return {
                topic: forcedTopic.topic,
                confidence: 0.96,
                answer: forcedTopic.answer({ context, query }),
                suggestions: forcedTopic.suggestions
            };
        }
    }

    const ranked = knowledgeBase
        .map((item) => {
            const baseScore = matchScore(query, item.keywords);
            const boostScore = getIntentBoost(query, item.topic);

            return {
                ...item,
                baseScore,
                boostScore,
                score: Number((baseScore + boostScore).toFixed(2))
            };
        })
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.boostScore !== a.boostScore) return b.boostScore - a.boostScore;
            return b.baseScore - a.baseScore;
        });

    const best = ranked[0];

    if (!best || best.score === 0) {
        return {
            topic: 'general',
            confidence: 0.35,
            answer: 'I can help with order, payment, returns, shipping, refund, and cancellation support. Tell me your exact issue in one line.',
            suggestions: ['Payment failed, what should I do?', 'How can I return a product?', 'How long does delivery take?']
        };
    }

    const confidence = Number(Math.min(0.97, 0.45 + best.score * 0.08).toFixed(2));

    return {
        topic: best.topic,
        confidence,
        answer: best.answer({ context }),
        suggestions: best.suggestions
    };
};
