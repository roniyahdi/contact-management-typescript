import { NextFunction, Response } from "express";
import {
  CreateAddressRequest,
  GetAddressRequest,
  RemoveAddressRequest,
  UpdateAddressRequest,
} from "../model/address-model";
import { UserRequest } from "../model/user-request";
import { AddressService } from "../service/address-service";
import { logger } from "../application/logging";

export class AddressController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAddressRequest = req.body as CreateAddressRequest;
      request.contactId = Number(req.params.contactId);
      const response = await AddressService.create(req.user!, request);
      logger.debug(`DEBUG: ${response}`);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: GetAddressRequest = {
        contactId: Number(req.params.contactId),
        addressId: Number(req.params.addressId),
      };

      const response = await AddressService.get(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateAddressRequest = req.body as UpdateAddressRequest;
      request.contactId = Number(req.params.contactId);
      request.id = Number(req.params.addressId);
      const response = await AddressService.update(req.user!, request);
      logger.debug(`DEBUG: ${response}`);
      logger.debug(`DEBUG: ${response}`);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async remove(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: RemoveAddressRequest = {
        contactId: Number(req.params.contactId),
        addressId: Number(req.params.addressId),
      };

      await AddressService.remove(req.user!, request);
      res.status(200).json({
        data: "OK",
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const contactId = Number(req.params.contactId);
      const response = await AddressService.list(req.user!, contactId);
      logger.debug(`DEBUG: ${response}`);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
