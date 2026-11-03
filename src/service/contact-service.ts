import { Contact, User } from "@prisma/client";
import {
  ContactResponse,
  CreateContactRequest,
  Pageable,
  SearchContactRequest,
  toContactResponse,
  UpdateContactRequest,
} from "../model/contact-model";
import { validate } from "../validation/validation";
import { ContactValidation } from "../validation/contact-validation";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";

export class ContactService {

  static async create(
    user: User,
    request: CreateContactRequest
  ): Promise<ContactResponse> {
    const createRequest = validate(ContactValidation.CREATE, request);

    const contact = await prismaClient.contact.create({
      data: {
        first_name: createRequest.firstName,
        last_name: createRequest.lastName,
        email: createRequest.email,
        phone: createRequest.phone,
        username: user.username,
      },
    });

    logger.debug("Record: " + JSON.stringify(contact));
    return toContactResponse(contact);
  }

  static async checkContactMustExist(
    username: string,
    contactId: number
  ): Promise<Contact> {
    const contact = await prismaClient.contact.findFirst({
      where: {
        id: contactId,
        username: username,
      },
    });

    if (!contact) {
      throw new ResponseError(404, "Contact is not found");
    }

    return contact;
  }

  static async get(user: User, contactId: number): Promise<ContactResponse> {
    const contact = await this.checkContactMustExist(user.username, contactId);

    return toContactResponse(contact);
  }

  static async update(user: User, request: UpdateContactRequest) {
    const updateRequest = validate(ContactValidation.UPDATE, request);
    await this.checkContactMustExist(user.username, updateRequest.id);

    const contact = await prismaClient.contact.update({
      where: {
        username: user.username,
        id: updateRequest.id,
      },
      data: {
        first_name: updateRequest.firstName,
        last_name: updateRequest.lastName,
        email: updateRequest.email,
        phone: updateRequest.phone,
      },
    });

    logger.debug("Record: " + JSON.stringify(contact));
    return toContactResponse(contact);
  }

  static async delete(user: User, contactId: number): Promise<void> {
    await this.checkContactMustExist(user.username, contactId);

    await prismaClient.contact.delete({
      where: {
        username: user.username,
        id: contactId,
      },
    });
  }

  static async search(
    user: User,
    request: SearchContactRequest
  ): Promise<Pageable<ContactResponse>> {
    const searchRequest = validate(ContactValidation.SEARCH, request);

    const skip = (searchRequest.page - 1) * searchRequest.size;
    const filters = [];

    if (searchRequest.name) {
      filters.push({
        OR: [
          { first_name: { contains: searchRequest.name } },
          { last_name: { contains: searchRequest.name } },
        ],
      });
    }

    if (searchRequest.email) {
      filters.push({
        email: { contains: searchRequest.email },
      });
    }

    if (searchRequest.phone) {
      filters.push({
        phone: { contains: searchRequest.phone },
      });
    }

    const contacts = await prismaClient.contact.findMany({
      where: {
        username: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await prismaClient.contact.count({
      where: {
        username: user.username,
        AND: filters,
      },
    });

    logger.debug(`RECORD: ${JSON.stringify(contacts)}`);
    return {
      data: contacts.map(function (contact) {
        return toContactResponse(contact);
      }),
      paging: {
        currentPage: searchRequest.page,
        totalPage: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
      },
    };
  }
}
