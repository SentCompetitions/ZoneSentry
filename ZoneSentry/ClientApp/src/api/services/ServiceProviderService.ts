/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyServiceRequestDTO } from '../models/RealtyServiceRequestDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServiceProviderService {

    /**
     * @returns RealtyServiceRequestDTO Success
     * @throws ApiError
     */
    public static getApiServiceproviderRequests(): CancelablePromise<Array<RealtyServiceRequestDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/serviceprovider/requests',
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiServiceproviderRequestsAccept(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/serviceprovider/requests/{id}/accept',
            path: {
                'id': id,
            },
        });
    }

}