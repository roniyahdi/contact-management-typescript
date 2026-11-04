import { Address, User } from "@prisma/client";
import {
  AddressResponse,
  CreateAddressRequest,
  GetAddressRequest,
  RemoveAddressRequest,
  toAddressResponse,
  UpdateAddressRequest,
} from "../model/address-model";
import { validate } from "../validation/validation";
import { AddressValidation } from "../validation/address-validation";
import { ContactService } from "./contact-service";
import { prismaClient } from "../application/database";
import { logger } from "../application/logging";
import { ResponseError } from "../error/response-error";

export class AddressService {
  static async create(
    user: User,
    request: CreateAddressRequest
  ): Promise<AddressResponse> {
    const createRequest = validate<CreateAddressRequest>(
      AddressValidation.CREATE,
      request
    );

    await ContactService.checkContactMustExist(
      user.username,
      createRequest.contactId
    );

    const address = await prismaClient.address.create({
      data: {
        street: createRequest.street,
        city: createRequest.city,
        province: createRequest.province,
        country: createRequest.country,
        postal_code: createRequest.postalCode,
        contact_id: createRequest.contactId,
      },
    });
    logger.debug(`DEBUG: ${address}`);
    return toAddressResponse(address);
  }

  static async checkAddressMustExist(
    contactId: number,
    addressId: number
  ): Promise<Address> {
    const address = await prismaClient.address.findFirst({
      where: {
        contact_id: contactId,
        id: addressId,
      },
    });

    if (!address) {
      throw new ResponseError(404, "Address is not found");
    }

    return address;
  }

  static async get(
    user: User,
    request: GetAddressRequest
  ): Promise<AddressResponse> {
    const getRequest = validate(AddressValidation.GET, request);
    await ContactService.checkContactMustExist(
      user.username,
      getRequest.contactId
    );

    const address = await this.checkAddressMustExist(
      getRequest.contactId,
      getRequest.addressId
    );

    return toAddressResponse(address);
  }

  static async update(
    user: User,
    request: UpdateAddressRequest
  ): Promise<AddressResponse> {
    const updateRequest = validate(AddressValidation.UPDATE, request);
    await ContactService.checkContactMustExist(
      user.username,
      updateRequest.contactId
    );
    await this.checkAddressMustExist(updateRequest.contactId, updateRequest.id);

    const address = await prismaClient.address.update({
      where: {
        id: updateRequest.id,
        contact_id: updateRequest.contactId,
      },
      data: {
        street: updateRequest.street,
        city: updateRequest.city,
        province: updateRequest.province,
        country: updateRequest.country,
        postal_code: updateRequest.postalCode,
      },
    });

    return toAddressResponse(address);
  }

  static async remove(
    user: User,
    request: RemoveAddressRequest
  ): Promise<void> {
    const removeRequest = validate(AddressValidation.GET, request);
    await ContactService.checkContactMustExist(
      user.username,
      removeRequest.contactId
    );

    await this.checkAddressMustExist(
      removeRequest.contactId,
      removeRequest.addressId
    );

    await prismaClient.address.delete({
      where: {
        contact_id: removeRequest.contactId,
        id: removeRequest.addressId,
      },
    });
  }

  static async list(
    user: User,
    contactId: number
  ): Promise<Array<AddressResponse>> {
    await ContactService.checkContactMustExist(user.username, contactId);

    const contacts = await prismaClient.address.findMany({
      where: {
        contact_id: contactId,
      },
    });

    return contacts.map(function (contact) {
      return toAddressResponse(contact);
    });
  }
}
