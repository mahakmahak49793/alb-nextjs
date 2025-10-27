import { z } from 'zod';

export const consultationSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  mobileNumber: z.string()
    .min(10, 'Mobile number must be at least 10 digits')
    .regex(/^[0-9]+$/, 'Mobile number must contain only digits')
    .max(10, 'Mobile number must be at most 10 digits'),
  dateOfBirth: z.string().optional(),
  timeOfBirth: z.string().optional(),
  placeOfBirth: z.string().min(1, 'Place of birth is required'),
  consultationTopic: z.string().min(1, 'Consultation topic is required'),
  dontKnowDOB: z.boolean().optional(),
  dontKnowTOB: z.boolean().optional(),
}).refine((data) => {
  if (!data.dontKnowDOB && !data.dateOfBirth) {
    return false;
  }
  return true;
}, {
  message: "Date of birth is required",
  path: ["dateOfBirth"],
});