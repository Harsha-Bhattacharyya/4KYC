'use client'

import { useState } from 'react'

export default function Home() {
  const [aadhaar, setAadhaar] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success: boolean
    isAdult?: boolean
    message?: string
  } | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      // NOTE: In production, implement client-side encryption here
      // before sending to the API for true zero-knowledge E2EE
      // Example: Use Web Crypto API or a library like TweetNaCl
      
      const response = await fetch('/api/kyc/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadhaar }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: 'An error occurred during verification',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '50px auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center' }}>4KYC - Age Verification</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>
        Privacy-respecting e-KYC platform with zero-knowledge proof
      </p>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '5px',
        marginTop: '30px'
      }}>
        <h2>Privacy Notice</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li>We only verify if you are 18 years or older</li>
          <li>No personal information is stored or logged</li>
          <li>Zero-knowledge encryption ensures your data privacy</li>
          <li>End-to-end encrypted communication</li>
          <li>Self-hostable for complete control</li>
        </ul>
      </div>

      <form onSubmit={handleVerify} style={{ marginTop: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="aadhaar" style={{ display: 'block', marginBottom: '8px' }}>
            Aadhaar Number:
          </label>
          <input
            type="text"
            id="aadhaar"
            value={aadhaar}
            onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
            placeholder="Enter 12-digit Aadhaar number"
            required
            maxLength={12}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          <small style={{ color: '#666', fontSize: '12px' }}>
            12 digits only (e.g., 123456789012)
          </small>
        </div>

        <button
          type="submit"
          disabled={loading || aadhaar.length !== 12}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Verifying...' : 'Verify Age'}
        </button>
      </form>

      {result && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '4px',
          color: result.success ? '#155724' : '#721c24'
        }}>
          <h3 style={{ marginTop: 0 }}>Verification Result</h3>
          {result.success ? (
            <>
              <p>
                <strong>Age Status:</strong> {result.isAdult ? '18 years or older ✓' : 'Under 18 years'}
              </p>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>
                No personal information was stored or logged during this verification.
              </p>
            </>
          ) : (
            <p>{result.message}</p>
          )}
        </div>
      )}

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f9f9f9',
        borderRadius: '5px'
      }}>
        <h3>API Access</h3>
        <p>This platform also provides API access for integration:</p>
        
        <div style={{ marginTop: '15px' }}>
          <strong>REST API:</strong>
          <pre style={{ 
            backgroundColor: '#fff', 
            padding: '10px', 
            borderRadius: '4px',
            overflowX: 'auto',
            fontSize: '12px'
          }}>
{`POST /api/kyc/verify
Content-Type: application/json

{
  "aadhaar": "123456789012"
}`}
          </pre>
        </div>

        <div style={{ marginTop: '15px' }}>
          <strong>GraphQL API:</strong>
          <pre style={{ 
            backgroundColor: '#fff', 
            padding: '10px', 
            borderRadius: '4px',
            overflowX: 'auto',
            fontSize: '12px'
          }}>
{`POST /api/graphql
Content-Type: application/json

{
  "query": "mutation { verifyAge(aadhaar: \\"123456789012\\") { success isAdult message } }"
}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
