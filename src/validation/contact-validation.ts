import { z, ZodType } from "zod";
import {
  CreateContactRequest,
  SearchContactRequest,
  UpdateContactRequest,
} from "../model/contact-model";

export class ContactValidation {
  static readonly CREATE: ZodType<CreateContactRequest> = z.object({
    firstName: z
      .string()
      .min(1, { error: "Username dilarang kosong" })
      .min(3, { error: "Username minimal 3 karakter" })
      .max(100),
    lastName: z
      .string()
      .min(3, { error: "Last Name minimal 3 karakter" })
      .max(100)
      .optional(),
    email: z
      .email({ error: "Format email tidak valid" })
      .min(1)
      .max(100)
      .optional(),
    phone: z.string().min(1).max(20).optional(),
  });

  static readonly UPDATE: ZodType<UpdateContactRequest> = z.object({
    id: z.number().positive(),
    firstName: z.string().min(1).min(3).max(100),
    lastName: z.string().min(3).max(100).optional(),
    email: z.email().min(1).max(100).optional(),
    phone: z.string().min(1).max(20).optional(),
  });

  static readonly SEARCH: ZodType<SearchContactRequest> = z.object({
    name: z.string().min(1).max(100).optional(),
    email: z.string().min(1).max(100).optional(),
    phone: z.string().min(1).max(20).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(20).positive(),
  });
}
