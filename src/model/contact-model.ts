import { Contact } from "@prisma/client";

export interface ContactResponse {
  id: number;
  firstName: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface CreateContactRequest {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface UpdateContactRequest {
  id: number;
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface SearchContactRequest {
  name?: string;
  phone?: string;
  email?: string;
  page: number;
  size: number;
}

export interface Pageable<T> {
  data: Array<T>;
  paging: {
    currentPage: number;
    totalPage: number;
    size: number;
  };
}

export function toContactResponse(contact: Contact): ContactResponse {
  return {
    id: contact.id,
    firstName: contact.first_name,
    lastName: contact.last_name,
    email: contact.email,
    phone: contact.phone,
  };
}
