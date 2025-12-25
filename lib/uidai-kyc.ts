/**
 * UIDAI e-KYC Integration with Zero-Knowledge Encryption
 * 
 * This module provides age verification using UIDAI Aadhaar API
 * without storing or exposing any Personally Identifiable Information (PII).
 * 
 * Features:
 * - Zero-knowledge proof system
 * - End-to-end encryption
 * - Only returns boolean age verification (18+ or not)
 * - No PII is logged or stored
 */

export interface AgeVerificationResult {
  success: boolean
  isAdult?: boolean
  message?: string
}

/**
 * Validates Aadhaar number format
 */
export function validateAadhaarNumber(aadhaar: string): boolean {
  // Remove any spaces or special characters
  const cleanAadhaar = aadhaar.replace(/\D/g, '')
  
  // Check if it's exactly 12 digits
  if (cleanAadhaar.length !== 12) {
    return false
  }
  
  // Verhoeff algorithm for Aadhaar validation
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ]
  
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ]
  
  let c = 0
  const invertedArray = cleanAadhaar.split('').map(Number).reverse()
  
  invertedArray.forEach((val, i) => {
    c = d[c][p[(i % 8)][val]]
  })
  
  return c === 0
}

/**
 * Simulates zero-knowledge proof encryption
 * In production, this would use actual cryptographic libraries
 * 
 * SECURITY NOTE: This is a MOCK implementation for demonstration only.
 * In production, implement proper E2EE using:
 * - libsodium (NaCl) for encryption
 * - Public key cryptography with UIDAI's public keys
 * - Secure key exchange protocols
 */
export function encryptWithZeroKnowledge(data: string): string {
  // WARNING: This is NOT actual encryption - only base64 encoding for demo
  // In production, replace with proper encryption like:
  // - sodium.crypto_box_seal() for public key encryption
  // - AES-256-GCM for symmetric encryption with proper key management
  return Buffer.from(data).toString('base64')
}

/**
 * Calculates age from date of birth
 */
export function calculateAge(dateOfBirth: Date): number {
  const today = new Date()
  let age = today.getFullYear() - dateOfBirth.getFullYear()
  const monthDiff = today.getMonth() - dateOfBirth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--
  }
  
  return age
}

/**
 * Verifies age using UIDAI e-KYC API
 * 
 * NOTE: This is a mock implementation. In production, you would:
 * 1. Integrate with actual UIDAI e-KYC API
 * 2. Use proper OAuth/API keys from UIDAI
 * 3. Implement actual E2EE with UIDAI's public keys
 * 4. Handle OTP verification flow
 * 
 * For production use:
 * - Register at https://uidai.gov.in/
 * - Obtain API credentials
 * - Implement proper authentication flow
 * - Use UIDAI's official SDK/API documentation
 */
export async function verifyAgeWithUIDAI(aadhaar: string): Promise<AgeVerificationResult> {
  try {
    // Validate Aadhaar number format
    if (!validateAadhaarNumber(aadhaar)) {
      return {
        success: false,
        message: 'Invalid Aadhaar number format'
      }
    }

    // Encrypt the Aadhaar number before transmission (zero-knowledge)
    const encryptedAadhaar = encryptWithZeroKnowledge(aadhaar)
    
    // In production, this would make an actual API call to UIDAI
    // Example (pseudocode):
    // const response = await fetch('https://api.uidai.gov.in/ekyc/v1/verify', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.UIDAI_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     aadhaar: encryptedAadhaar,
    //     // Additional UIDAI required parameters
    //   })
    // })
    
    // MOCK IMPLEMENTATION FOR DEMO PURPOSES ONLY
    // WARNING: This is not a real verification - for development/testing only
    // In production, replace this with actual UIDAI API integration
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock response - uses a simple hash to determine result
    // This prevents predictable patterns while keeping it deterministic for testing
    // In production, this would come from UIDAI's actual response
    // UIDAI returns DOB, we only check age and discard all PII
    
    // Use a simple hash of the Aadhaar number for unpredictable mock result
    const hash = aadhaar.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const mockIsAdult = hash % 3 !== 0  // ~66% will be adults in mock
    
    // In production, you would:
    // 1. Receive encrypted DOB from UIDAI
    // 2. Decrypt it locally
    // 3. Calculate age
    // 4. Immediately discard DOB (zero-knowledge)
    // 5. Return only boolean age verification
    
    return {
      success: true,
      isAdult: mockIsAdult,
      message: 'Age verification completed successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to verify age. Please try again.'
    }
  }
}

/**
 * Additional security: Rate limiting per IP
 * In production, implement proper rate limiting
 */
export function checkRateLimit(ip: string): boolean {
  // Implement rate limiting logic
  // For production: use Redis or similar
  return true
}
