const positiveWords = [
    'good', 'great', 'excellent', 'premium', 'durable', 'comfortable', 'value', 'worth', 'best', 'sturdy', 'easy'
];

const negativeWords = [
    'bad', 'poor', 'slow', 'damaged', 'worst', 'problem', 'issue', 'late', 'disappoint', 'not good', 'broken'
];

const featureKeywords = {
    fit: ['fit', 'size', 'comfortable', 'lightweight', 'portable', 'strap', 'daily use'],
    quality: ['quality', 'build', 'durable', 'material', 'finish', 'sturdy', 'premium'],
    value: ['value', 'worth', 'price', 'budget', 'deal', 'expensive', 'money']
};

const toTitle = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const includesAny = (text, words) => words.some((word) => text.includes(word));

const normalizeText = (text = '') => text.toLowerCase().replace(/\s+/g, ' ').trim();

const avg = (values) => {
    if (!values.length) return 0;
    return values.reduce((total, value) => total + value, 0) / values.length;
};

const scoreToLabel = (score) => {
    if (score >= 8.5) return 'Excellent';
    if (score >= 7.2) return 'Very Good';
    if (score >= 6) return 'Good';
    return 'Average';
};

const riskLabel = (score) => {
    if (score >= 70) return 'High Risk';
    if (score >= 40) return 'Medium Risk';
    return 'Low Risk';
};

const collectFeatureScores = (reviews, feature) => {
    const keywords = featureKeywords[feature];

    const hits = reviews
        .filter((review) => includesAny(normalizeText(review.comment), keywords))
        .map((review) => Number(review.rating || 0));

    const weightedAverage = hits.length ? avg(hits) : avg(reviews.map((review) => Number(review.rating || 0)));
    const score = Math.min(10, Math.max(1, Number((weightedAverage * 2).toFixed(1))));

    return {
        score,
        label: scoreToLabel(score)
    };
};

const buildProsAndCons = (reviews) => {
    const pros = [];
    const cons = [];

    reviews.forEach((review) => {
        const text = normalizeText(review.comment);

        if (includesAny(text, positiveWords) || Number(review.rating) >= 4) {
            pros.push(review.comment);
        }

        if (includesAny(text, negativeWords) || Number(review.rating) <= 2) {
            cons.push(review.comment);
        }
    });

    return {
        pros: [...new Set(pros)].slice(0, 3),
        cons: [...new Set(cons)].slice(0, 3)
    };
};

const analyzeSuspiciousSignals = (reviews) => {
    const normalizedComments = reviews.map((review) => normalizeText(review.comment));
    const duplicateComments = normalizedComments.filter((comment, index) => normalizedComments.indexOf(comment) !== index).length;

    const genericSpamComments = normalizedComments.filter((comment) => {
        return comment.length < 30 || /best product best product|must buy/.test(comment);
    }).length;

    const unverifiedFiveStar = reviews.filter((review) => !review.verified && Number(review.rating) >= 5).length;

    const mismatchCount = reviews.filter((review) => {
        const text = normalizeText(review.comment);
        const hasPositiveTone = includesAny(text, positiveWords);
        const hasNegativeTone = includesAny(text, negativeWords);
        const rating = Number(review.rating || 0);

        return (hasPositiveTone && rating <= 2) || (hasNegativeTone && rating >= 4);
    }).length;

    const rawScore = duplicateComments * 20 + genericSpamComments * 15 + unverifiedFiveStar * 20 + mismatchCount * 10;
    const score = Math.min(100, rawScore);

    const signals = [];

    if (duplicateComments) signals.push(`${duplicateComments} duplicate review text patterns`);
    if (genericSpamComments) signals.push(`${genericSpamComments} short or generic review patterns`);
    if (unverifiedFiveStar) signals.push(`${unverifiedFiveStar} unverified 5-star reviews`);
    if (mismatchCount) signals.push(`${mismatchCount} rating/comment tone mismatches`);

    return {
        score,
        label: riskLabel(score),
        signals
    };
};

export const getReviewIntelligence = (product) => {
    const reviews = Array.isArray(product?.reviews) ? product.reviews : [];

    if (!reviews.length) {
        return {
            reviewCount: 0,
            averageRating: 0,
            pros: [],
            cons: [],
            insights: {
                fit: { score: 0, label: 'No Data' },
                quality: { score: 0, label: 'No Data' },
                value: { score: 0, label: 'No Data' }
            },
            suspicious: {
                score: 0,
                label: 'Low Risk',
                signals: []
            }
        };
    }

    const averageRating = Number(avg(reviews.map((review) => Number(review.rating || 0))).toFixed(1));
    const { pros, cons } = buildProsAndCons(reviews);

    const insights = Object.keys(featureKeywords).reduce((accumulator, feature) => {
        accumulator[feature] = collectFeatureScores(reviews, feature);
        return accumulator;
    }, {});

    const suspicious = analyzeSuspiciousSignals(reviews);

    const prosSummary = pros.length
        ? pros.map((item) => item.slice(0, 110)).join(' | ')
        : `Buyers say this ${toTitle(product.title.shortTitle)} gives balanced performance and easy daily usage.`;

    const consSummary = cons.length
        ? cons.map((item) => item.slice(0, 110)).join(' | ')
        : 'Most users did not report major problems in early usage.';

    return {
        reviewCount: reviews.length,
        averageRating,
        pros,
        cons,
        prosSummary,
        consSummary,
        insights,
        suspicious
    };
};
