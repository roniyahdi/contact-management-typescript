import { Address } from "@prisma/client";

export interface AddressResponse {
  id: number;
  street?: string | null;
  city?: string | null;
  province?: string | null;
  country: string;
  postalCode: string;
}

export interface CreateAddressRequest {
  contactId: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postalCode: string;
}

export interface GetAddressRequest {
  contactId: number;
  addressId: number;
}

export interface UpdateAddressRequest {
  contactId: number;
  id: number;
  street?: string;
  city?: string;
  province?: string;
  country: string;
  postalCode: string;
}

export interface RemoveAddressRequest extends GetAddressRequest {}

export function toAddressResponse(address: Address): AddressResponse {
  return {
    id: address.id,
    street: address.street,
    city: address.city,
    province: address.province,
    country: address.country,
    postalCode: address.postal_code,
  };
}
