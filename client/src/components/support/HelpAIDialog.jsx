import { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    styled
} from '@mui/material';
import { SmartToy, Send, Close } from '@mui/icons-material';
import { fetchFAQs } from '../../services/api';

const Trigger = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: 15
    }
}));

const MessagesArea = styled(Box)({
    minHeight: 320,
    maxHeight: 320,
    overflowY: 'auto',
    padding: '4px 4px 8px'
});

const Bubble = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isUser'
})(({ isUser }) => ({
    background: isUser ? '#2874f0' : '#f1f5fb',
    color: isUser ? '#ffffff' : '#1d3552',
    borderRadius: 10,
    padding: '10px 12px',
    maxWidth: '85%',
    marginLeft: isUser ? 'auto' : 0,
    marginBottom: 8,
    fontSize: 13.5,
    lineHeight: 1.45
}));

const HelpAIDialog = () => {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 'bot-welcome',
            role: 'bot',
            text: 'Hi, these are support FAQs. Ask about orders, payment, returns, shipping, or refund.'
        }
    ]);
    const [suggestions, setSuggestions] = useState([
        'How do I place order?',
        'What payment methods are available?',
        'How long does delivery take?'
    ]);

    const context = useMemo(() => ({ app: 'flipkart-clone' }), []);

    const onOpen = (event) => {
        if (event) {
            event.stopPropagation();
        }

        setOpen(true);
    };

    const onClose = () => setOpen(false);

    const sendMessage = async (questionText) => {
        const question = questionText.trim();
        if (!question || loading) return;

        const userMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            text: question
        };

        setMessages((previous) => [...previous, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetchFAQs(question, context);
            const data = response?.data || {};

            setMessages((previous) => [
                ...previous,
                {
                    id: `bot-${Date.now()}`,
                    role: 'bot',
                    text: data.answer || 'I can help with orders, payment, shipping, and returns.'
                }
            ]);

            setSuggestions(Array.isArray(data.suggestions) ? data.suggestions.slice(0, 3) : []);
        } catch (error) {
            setMessages((previous) => [
                ...previous,
                {
                    id: `bot-error-${Date.now()}`,
                    role: 'bot',
                    text: 'FAQs are temporarily unavailable. Please try again in a moment.'
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        sendMessage(input);
    };

    return (
        <>
            <Trigger onClick={onOpen}>
                <SmartToy fontSize="small" /> FAQs
            </Trigger>

            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SmartToy color="primary" />
                        <Typography sx={{ fontWeight: 700 }}>Support FAQs</Typography>
                    </Box>
                    <IconButton onClick={onClose}>
                        <Close fontSize="small" />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <MessagesArea>
                        {messages.map((message) => (
                            <Bubble key={message.id} isUser={message.role === 'user' ? 1 : 0}>
                                {message.text}
                            </Bubble>
                        ))}

                        {loading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <CircularProgress size={14} />
                                <Typography sx={{ fontSize: 12, color: '#67809b' }}>Fetching FAQs...</Typography>
                            </Box>
                        ) : null}
                    </MessagesArea>

                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.2 }}>
                        {suggestions.map((item) => (
                            <Chip key={item} label={item} size="small" onClick={() => sendMessage(item)} />
                        ))}
                    </Box>

                    <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Ask about order, payment, returns, shipping..."
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                        />
                        <Button type="submit" variant="contained" disabled={!input.trim() || loading}>
                            <Send fontSize="small" />
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default HelpAIDialog;
