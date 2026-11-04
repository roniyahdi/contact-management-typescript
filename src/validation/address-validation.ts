import { z, ZodType } from "zod";
import {
  CreateAddressRequest,
  GetAddressRequest,
  UpdateAddressRequest,
} from "../model/address-model";

export class AddressValidation {
  static readonly CREATE: ZodType<CreateAddressRequest> = z.object({
    contactId: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postalCode: z.string().min(1).max(10),
  });

  static readonly GET: ZodType<GetAddressRequest> = z.object({
    contactId: z.number().positive(),
    addressId: z.number().positive(),
  });

  static readonly UPDATE: ZodType<UpdateAddressRequest> = z.object({
    contactId: z.number().positive(),
    id: z.number().positive(),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(100).optional(),
    province: z.string().min(1).max(100).optional(),
    country: z.string().min(1).max(100),
    postalCode: z.string().min(1).max(10),
  });
}
