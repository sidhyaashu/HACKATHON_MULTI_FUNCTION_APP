import { useState } from 'react';
import axios from 'axios';
import { Button, TextField, CircularProgress, Snackbar, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useTheme } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
    padding: '20px',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '8px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    transition: 'transform 0.2s ease',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const DownloadButton = styled(StyledButton)(({ theme }) => ({
    color: '#fff',
    backgroundColor: '#4caf50',
    '&:hover': {
        backgroundColor: '#45a049',
    },
}));

const URLScreenshot = () => {
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [screenshotPreview, setScreenshotPreview] = useState(null);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState('error');
    const [showInput, setShowInput] = useState(true);
    const theme = useTheme();

    const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'));  // Phones and below
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));       // Portrait tablets, large phones
    const isMobileOrTablet = isSmall || isExtraSmall;

    const isValidUrl = (url) => {
        const regex = /^(https?:\/\/)?([a-z0-9]+[.]){1,2}[a-z]{2,6}(\/.*)?$/i;
        return regex.test(url);
    };

    const handleScreenshot = async () => {
        setError('');
        setLoading(true);
        setScreenshotPreview(null);
        setShowInput(false);

        if (!isValidUrl(url)) {
            setError('Invalid URL');
            setLoading(false);
            setShowInput(true);
            return;
        }

        try {
            const response = await axios.post(
                '/api/take-ss/take-screenshot',
                { url },
                { responseType: 'blob' }
            );

            const blob = new Blob([response.data], { type: 'image/png' });
            const previewUrl = window.URL.createObjectURL(blob);
            setScreenshotPreview(previewUrl);

            setToastSeverity('success');
            setToastMessage('Screenshot captured successfully!');
            setToastOpen(true);
        } catch (err) {
            console.error('Error taking screenshot:', err);
            setToastSeverity('error');
            setToastMessage('Failed to capture screenshot. Please try again.');
            setToastOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!screenshotPreview) return;

        const link = document.createElement('a');
        link.href = screenshotPreview;
        link.download = 'screenshot.png';
        link.click();
    };

    const resetForm = () => {
        setUrl('');
        setScreenshotPreview(null);
        setError('');
        setShowInput(true);
    };

    const handleCloseToast = () => {
        setToastOpen(false);
    };

    return (
        <Container>
            <h1 className={`text-4xl font-bold mb-6 ${isMobileOrTablet ? 'text-3xl' : 'text-4xl'} text-blue-700 font-roboto`}>
                URL Screenshot Generator
            </h1>
            {showInput && (
                <TextField
                    label="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    fullWidth
                    error={Boolean(error)}
                    helperText={error}
                    variant="outlined"
                    style={{ marginBottom: '20px' }}
                    InputProps={{
                        style: { fontSize: isMobileOrTablet ? '14px' : '16px' }, // Adjust font size for input
                    }}
                />
            )}
            {loading ? (
                <CircularProgress />
            ) : (
                showInput && (
                    <StyledButton
                        onClick={handleScreenshot}
                        disabled={!url}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        {loading ? 'Taking Screenshot...' : 'Capture Screenshot'}
                    </StyledButton>
                )
            )}
            {screenshotPreview && (
                <>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <img
                            src={screenshotPreview}
                            alt="Screenshot preview"
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                                boxShadow: theme.shadows[4],
                                maxHeight: isMobileOrTablet ? '300px' : '400px', // Limit image height on mobile
                            }}
                        />
                    </div>
                    <DownloadButton
                        onClick={handleDownload}
                        variant="outlined"
                        fullWidth
                        startIcon={<CheckCircleIcon />}
                    >
                        Download Screenshot
                    </DownloadButton>
                    <StyledButton
                        onClick={resetForm}
                        variant="contained"
                        color="secondary"
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        New Screenshot
                    </StyledButton>
                </>
            )}
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={handleCloseToast}
                message={toastMessage}
                ContentProps={{
                    style: {
                        backgroundColor: toastSeverity === 'error' ? '#f44336' : '#4caf50',
                        fontSize: isMobileOrTablet ? '14px' : '16px', // Adjust font size for snackbar
                        display: 'flex',
                        alignItems: 'center',
                    },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Change position to top-right
                action={toastSeverity === 'error' ? <ErrorIcon style={{ marginRight: '8px' }} /> : <CheckCircleIcon />}
            />
        </Container>
    );
};

export default URLScreenshot;
