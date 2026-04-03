import { useEffect, useMemo, useState } from 'react';
import { Box, Chip, Divider, Grid, Paper, Typography, styled } from '@mui/material';
import { fetchReviewIntelligence } from '../../services/api';

const Wrapper = styled(Paper)(({ theme }) => ({
    marginTop: 18,
    padding: 16,
    borderRadius: 8,
    border: '1px solid #e7edf5',
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
        padding: 12
    }
}));

const ScoreCard = styled(Box)({
    border: '1px solid #e5ebf2',
    borderRadius: 8,
    padding: 10,
    background: '#fbfdff'
});

const ReviewCard = styled(Box)({
    borderBottom: '1px dashed #e0e7ef',
    padding: '10px 0'
});

const scoreColor = (score) => {
    if (score >= 8.5) return '#137333';
    if (score >= 7) return '#2874f0';
    return '#9c6f00';
};

const ReviewIntelligence = ({ productId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [payload, setPayload] = useState(null);

    useEffect(() => {
        if (!productId) return;

        let active = true;

        const load = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await fetchReviewIntelligence(productId);

                if (active) {
                    setPayload(response.data);
                }
            } catch (err) {
                if (active) {
                    setError('Unable to load AI review insights right now.');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        load();

        return () => {
            active = false;
        };
    }, [productId]);

    const reviewPreview = useMemo(() => {
        if (!payload?.reviews?.length) return [];
        return payload.reviews.slice(0, 3);
    }, [payload]);

    if (loading) {
        return (
            <Wrapper>
                <Typography sx={{ color: '#3d5570' }}>Loading AI review insights...</Typography>
            </Wrapper>
        );
    }

    if (error) {
        return (
            <Wrapper>
                <Typography sx={{ color: '#b00020' }}>{error}</Typography>
            </Wrapper>
        );
    }

    const intelligence = payload?.intelligence;

    if (!intelligence) {
        return null;
    }

    return (
        <Wrapper>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#163b64' }}>
                AI Review Intelligence
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#5f748b', mb: 1.5 }}>
                {intelligence.reviewCount} reviews analyzed | Average rating {intelligence.averageRating}/5
            </Typography>

            <Grid container spacing={1.2} sx={{ mb: 1.5 }}>
                {Object.entries(intelligence.insights || {}).map(([key, value]) => (
                    <Grid item xs={12} sm={4} key={key}>
                        <ScoreCard>
                            <Typography sx={{ fontSize: 12, color: '#637b94' }}>{key.toUpperCase()}</Typography>
                            <Typography sx={{ color: scoreColor(value.score), fontWeight: 800, fontSize: 18 }}>
                                {value.score}/10
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: '#4f6580' }}>{value.label}</Typography>
                        </ScoreCard>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
                <Chip
                    label={`Suspicious Review Risk: ${intelligence.suspicious.label}`}
                    color={intelligence.suspicious.score >= 70 ? 'error' : intelligence.suspicious.score >= 40 ? 'warning' : 'success'}
                    size="small"
                />
                <Chip label={`Risk Score: ${intelligence.suspicious.score}/100`} size="small" variant="outlined" />
            </Box>

            {intelligence.suspicious.signals?.length ? (
                <Typography sx={{ fontSize: 12, color: '#6b8196', mb: 1.5 }}>
                    Signals: {intelligence.suspicious.signals.join(', ')}
                </Typography>
            ) : null}

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ color: '#137333', fontWeight: 700, mb: 0.6 }}>Pros Summary</Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#334b64' }}>{intelligence.prosSummary}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography sx={{ color: '#b26a00', fontWeight: 700, mb: 0.6 }}>Cons Summary</Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#334b64' }}>{intelligence.consSummary}</Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 1.5 }} />
            <Typography sx={{ fontWeight: 700, color: '#163b64' }}>Recent Reviews</Typography>

            {reviewPreview.map((review) => (
                <ReviewCard key={review.id}>
                    <Typography sx={{ fontSize: 13, color: '#304a66' }}>
                        {review.user} | {review.rating}/5 | {review.verified ? 'Verified' : 'Unverified'}
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#435d78' }}>{review.comment}</Typography>
                </ReviewCard>
            ))}
        </Wrapper>
    );
};

export default ReviewIntelligence;
