/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyServiceDTO } from '../models/RealtyServiceDTO';
import type { RealtyServiceOrderDTO } from '../models/RealtyServiceOrderDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserRealtiesServicesOwnerService {

    /**
     * @param id 
     * @returns RealtyServiceDTO Success
     * @throws ApiError
     */
    public static getApiUserrealtiesservicesownerRealtiesAvailable(
id: number,
): CancelablePromise<Array<RealtyServiceDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesservicesowner/realties/{id}/available',
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
    public static getApiUserrealtiesservicesownerRealtiesOrdered(
id: number,
): CancelablePromise<Array<RealtyServiceOrderDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesservicesowner/realties/{id}/ordered',
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
    public static postApiUserrealtiesservicesownerRealtiesRealtyservicesRequest(
realtyId: number,
serviceId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/userrealtiesservicesowner/realties/{realtyId}/realtyservices/{serviceId}/request',
            path: {
                'realtyId': realtyId,
                'serviceId': serviceId,
            },
        });
    }

}