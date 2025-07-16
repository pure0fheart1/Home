# Set environment variables for Docker MCP Gateway
# Replace these with your actual API keys

$env:GITHUB_PERSONAL_ACCESS_TOKEN = "your-github-token-here"
$env:PERPLEXITY_ASK_API_KEY = "your-perplexity-api-key-here"
$env:SCRAPEZY_AUTH_TOKEN = "your-scrapezy-token-here"
$env:STRIPE_SECRET_KEY = "your-stripe-secret-key-here"

# Run Docker MCP Gateway
docker mcp gateway run 