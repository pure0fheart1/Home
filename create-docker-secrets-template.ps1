# Create Docker secrets for MCP Gateway
# Run this script to create the required secrets
# IMPORTANT: Replace all placeholder values with your actual API keys

Write-Host "Creating Docker secrets for MCP Gateway..." -ForegroundColor Green

# GitHub Personal Access Token - Get from https://github.com/settings/tokens
$githubToken = "your-github-personal-access-token-here"
echo $githubToken | docker secret create github.personal_access_token -

# Perplexity API Key - Get from https://www.perplexity.ai/settings/api
echo "your-perplexity-api-key-here" | docker secret create perplexity-ask.api_key -

# Scrapezy Auth Token - Get from https://scrapezy.com/
echo "your-scrapezy-token-here" | docker secret create scrapezy.auth_token -

# Stripe Secret Key - Get from https://dashboard.stripe.com/apikeys
echo "your-stripe-secret-key-here" | docker secret create stripe.secret_key -

Write-Host "Docker secrets created successfully!" -ForegroundColor Green
Write-Host "Remember to replace all placeholder values with your actual API keys!" -ForegroundColor Yellow

# List created secrets
Write-Host "`nCreated secrets:" -ForegroundColor Cyan
docker secret ls 