const checkVeniceApiKey = (req, res, next) => {
    if (!process.env.VENICE_API_KEY) {
        return res.status(500).json({
            error: 'Venice API Key is missing from server environment variables.'
        });
    }
    next();
};

module.exports = { checkVeniceApiKey };
