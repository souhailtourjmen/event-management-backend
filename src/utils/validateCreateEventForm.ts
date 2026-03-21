import { Request } from 'express';

/**
 * Validates and sanitizes the Create Event form data.
 * @param {Request} req - The Express request object.
 * @returns An object with the validation result.
 */
const validateCreateEventForm = (req: Request) => {
  const { title, description, date, location } = req.body;

  if (!title) return { error: 'Required field: title', data: null };
  if (!description) return { error: 'Required field: description', data: null };
  if (!date) return { error: 'Required field: date', data: null };
  if (!location) return { error: 'Required field: location', data: null };

  // Validate date format
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return { error: 'Invalid date format', data: null };
  }

  return {
    error: null,
    form: {
      title,
      description,
      date: parsedDate,
      location,
    },
  };
};

export default validateCreateEventForm;
