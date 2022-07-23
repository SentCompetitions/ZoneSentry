/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PurchaseRequestCreate } from '../models/PurchaseRequestCreate';
import type { PurchaseRequestDTO } from '../models/PurchaseRequestDTO';
import type { RealtyDetails } from '../models/RealtyDetails';
import type { RealtyUserView } from '../models/RealtyUserView';
import type { RentPaymentUserView } from '../models/RentPaymentUserView';
import type { RentRequestDTO } from '../models/RentRequestDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserRealtiesOwnerService {

    /**
     * @returns RealtyUserView Success
     * @throws ApiError
     */
    public static getApiUserrealtiesowner(): CancelablePromise<Array<RealtyUserView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesowner',
        });
    }

    /**
     * @param realtyId 
     * @returns RealtyDetails Success
     * @throws ApiError
     */
    public static getApiUserrealtiesowner1(
realtyId: number,
): CancelablePromise<RealtyDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesowner/{realtyId}',
            path: {
                'realtyId': realtyId,
            },
        });
    }

    /**
     * @returns RentRequestDTO Success
     * @throws ApiError
     */
    public static getApiUserrealtiesownerRentrequests(): CancelablePromise<Array<RentRequestDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesowner/rentrequests',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUserrealtiesownerRentrequestsAccept(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/userrealtiesowner/rentrequests/accept/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUserrealtiesownerRequestpurchase(
requestBody?: PurchaseRequestCreate,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/userrealtiesowner/requestpurchase',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @returns PurchaseRequestDTO Success
     * @throws ApiError
     */
    public static getApiUserrealtiesownerRentpurchase(): CancelablePromise<Array<PurchaseRequestDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesowner/rentpurchase',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUserrealtiesownerRentpurchaseAccept(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/userrealtiesowner/rentpurchase/accept/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param realtyId 
     * @returns RentPaymentUserView Success
     * @throws ApiError
     */
    public static getApiUserrealtiesownerRentpayments(
realtyId?: number,
): CancelablePromise<Array<RentPaymentUserView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesowner/rentpayments',
            query: {
                'realtyId': realtyId,
            },
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiUserrealtiesownerAgreements(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/userrealtiesowner/agreements/{id}',
            path: {
                'id': id,
            },
        });
    }

}