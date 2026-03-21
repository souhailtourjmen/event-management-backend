import { Request } from 'express';
import { TSignupForm } from '../types/types.d';

/**
 * Validates and sanitizes the sign-up form data.
 * @param {Request} req - The Express request object.
 * @returns An object with the validation result.
 */
const validateSignUpForm = (req: Request) => {
  const { fullName, email, phoneNumber, password } = req.body as TSignupForm;

  // Presence checks
  if (!fullName) return { error: 'Required field: fullName', data: null };
  if (!email) return { error: 'Required field: email', data: null };
  if (!phoneNumber) return { error: 'Required field: phoneNumber', data: null };
  if (!password) return { error: 'Required field: password', data: null };

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Invalid email format', data: null };
  }

  // Password strength (min 8 chars)
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters long', data: null };
  }

  return {
    error: null,
    form: { fullName, email, phoneNumber, password },
  };
};

export default validateSignUpForm;
