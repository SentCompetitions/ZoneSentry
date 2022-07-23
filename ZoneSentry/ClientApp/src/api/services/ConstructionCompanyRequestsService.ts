/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PurchaseRequestDTO } from '../models/PurchaseRequestDTO';
import type { RealtyServiceDTO } from '../models/RealtyServiceDTO';
import type { RealtyServiceOrderDTO } from '../models/RealtyServiceOrderDTO';
import type { RentRequestDTO } from '../models/RentRequestDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConstructionCompanyRequestsService {

    /**
     * @returns RentRequestDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompanyrequestsRentrequests(): CancelablePromise<Array<RentRequestDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompanyrequests/rentrequests',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiConstructioncompanyrequestsRentrequestsAccept(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/constructioncompanyrequests/rentrequests/accept/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns PurchaseRequestDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompanyrequestsPurchaserequests(): CancelablePromise<Array<PurchaseRequestDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompanyrequests/purchaserequests',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiConstructioncompanyrequestsPurchaserequestsAccept(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/constructioncompanyrequests/purchaserequests/accept/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns RealtyServiceDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompanyrequestsRealtiesAvailable(
id: number,
): CancelablePromise<Array<RealtyServiceDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompanyrequests/realties/{id}/available',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns RealtyServiceOrderDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompanyrequestsRealtiesOrdered(
id: number,
): CancelablePromise<Array<RealtyServiceOrderDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompanyrequests/realties/{id}/ordered',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param realtyId 
     * @param serviceId 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiConstructioncompanyrequestsRealtiesRealtyservicesRequest(
realtyId: number,
serviceId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/constructioncompanyrequests/realties/{realtyId}/realtyservices/{serviceId}/request',
            path: {
                'realtyId': realtyId,
                'serviceId': serviceId,
            },
        });
    }

}