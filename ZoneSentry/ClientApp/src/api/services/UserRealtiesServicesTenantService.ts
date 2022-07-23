/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyServiceDTO } from '../models/RealtyServiceDTO';
import type { RealtyServiceOrderDTO } from '../models/RealtyServiceOrderDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserRealtiesServicesTenantService {

    /**
     * @param id 
     * @returns RealtyServiceDTO Success
     * @throws ApiError
     */
    public static getApiUserrealtiesservicestenantRealtiesAvailable(
id: number,
): CancelablePromise<Array<RealtyServiceDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesservicestenant/realties/{id}/available',
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
    public static getApiUserrealtiesservicestenantRealtiesOrdered(
id: number,
): CancelablePromise<Array<RealtyServiceOrderDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesservicestenant/realties/{id}/ordered',
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
    public static postApiUserrealtiesservicestenantRealtiesRealtyservicesRequest(
realtyId: number,
serviceId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/userrealtiesservicestenant/realties/{realtyId}/realtyservices/{serviceId}/request',
            path: {
                'realtyId': realtyId,
                'serviceId': serviceId,
            },
        });
    }

}