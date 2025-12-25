# 4KYC - Privacy-Respecting e-KYC Platform

A Free and Open Source (FOSS) privacy-respecting KYC verification system using UIDAI Aadhaar e-KYC API with zero-knowledge encryption.

## Features

- 🔒 **Zero-Knowledge Encryption**: End-to-end encrypted verification process
- 🚫 **No PII Storage**: Only verifies age (18+), no personal data is stored or logged
- 🔐 **Privacy-First**: Implements zero-knowledge proof system
- 🏠 **Self-Hostable**: Complete control over your deployment
- 🌐 **Multi-Interface**: Works as standalone website AND as API (REST/GraphQL)
- ⚡ **Next.js App Router**: Modern, fast, and efficient
- 📱 **Plain UI**: Simple, accessible interface without unnecessary complexity

## Age Verification Only

This platform **only** verifies whether a person is 18 years or older. It does NOT:
- Store any personal information
- Log any verification attempts
- Expose any PII (Personally Identifiable Information)
- Keep any records of Aadhaar numbers or verification results

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Harsha-Bhattacharyya/4KYC.git
cd 4KYC
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Self-Hosting

### Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

The application will run on port 3000 by default. You can change this with:
```bash
PORT=8080 npm start
```

### Docker Deployment (Optional)

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t 4kyc .
docker run -p 3000:3000 4kyc
```

### Environment Variables

For production UIDAI integration, set these environment variables:

```bash
# UIDAI API credentials (obtain from https://uidai.gov.in/)
UIDAI_API_KEY=your_api_key
UIDAI_API_SECRET=your_api_secret
UIDAI_API_URL=https://api.uidai.gov.in/ekyc/v1

# Optional: Rate limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=900000  # 15 minutes in ms
```

## API Usage

### REST API

**Endpoint**: `POST /api/kyc/verify`

**Request**:
```json
{
  "aadhaar": "123456789012"
}
```

**Response**:
```json
{
  "success": true,
  "isAdult": true,
  "message": "Age verification completed successfully"
}
```

**Example with cURL**:
```bash
curl -X POST http://localhost:3000/api/kyc/verify \
  -H "Content-Type: application/json" \
  -d '{"aadhaar": "123456789012"}'
```

### GraphQL API

**Endpoint**: `POST /api/graphql`

**Query**:
```graphql
mutation {
  verifyAge(aadhaar: "123456789012") {
    success
    isAdult
    message
  }
}
```

**Example with cURL**:
```bash
curl -X POST http://localhost:3000/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation { verifyAge(aadhaar: \"123456789012\") { success isAdult message } }"}'
```

**GraphQL Playground**:
Visit `http://localhost:3000/api/graphql` in your browser to access the interactive GraphQL playground.

## Integration Example

### JavaScript/TypeScript
```typescript
async function verifyAge(aadhaar: string) {
  const response = await fetch('http://localhost:3000/api/kyc/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ aadhaar })
  })
  return await response.json()
}

const result = await verifyAge('123456789012')
console.log(result.isAdult ? 'Adult' : 'Not an adult')
```

### Python
```python
import requests

def verify_age(aadhaar):
    response = requests.post(
        'http://localhost:3000/api/kyc/verify',
        json={'aadhaar': aadhaar}
    )
    return response.json()

result = verify_age('123456789012')
print('Adult' if result['isAdult'] else 'Not an adult')
```

## UIDAI Integration Notes

⚠️ **Important**: The current implementation uses a mock API for demonstration purposes.

For production use with actual UIDAI e-KYC API:

1. Register at [UIDAI Developer Portal](https://uidai.gov.in/)
2. Obtain API credentials (API Key, Secret)
3. Update `lib/uidai-kyc.ts` with actual UIDAI API integration
4. Implement OTP verification flow as per UIDAI documentation
5. Use UIDAI's official SDK if available
6. Ensure compliance with UIDAI's terms of service

## Security Features

- **Verhoeff Algorithm**: Validates Aadhaar number format
- **Zero-Knowledge Proof**: Encrypts data before transmission
- **No Logging**: No personal data is logged or stored
- **Rate Limiting**: Prevents abuse (configurable)
- **HTTPS Required**: In production, always use HTTPS
- **E2EE**: End-to-end encryption for all sensitive data

## Privacy Commitment

This platform is designed with privacy as the core principle:
- Only age verification result is returned (18+ boolean)
- All personal information is immediately discarded after verification
- No database or persistent storage of user data
- No analytics or tracking
- Fully auditable open-source code

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

## Technology Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **APIs**: REST & GraphQL (via graphql-yoga)
- **Runtime**: Node.js 18+

## Contributing

Contributions are welcome! This is a FOSS project dedicated to privacy-respecting verification.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

See [LICENSE](LICENSE) file for details.

## Disclaimer

This is a privacy-focused age verification platform. Users are responsible for:
- Obtaining proper UIDAI credentials for production use
- Complying with UIDAI's terms of service
- Ensuring legal compliance in their jurisdiction
- Implementing additional security measures as needed

## Support

For issues and questions, please open an issue on GitHub.

---

Made with privacy in mind 🔒
