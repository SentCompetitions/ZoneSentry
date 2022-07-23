/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyServiceDTO } from '../models/RealtyServiceDTO';
import type { RealtyServiceRequestDTO } from '../models/RealtyServiceRequestDTO';
import type { RealtyServiceUpdate } from '../models/RealtyServiceUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ServiceProviderService {

    /**
     * @returns RealtyServiceDTO Success
     * @throws ApiError
     */
    public static getApiServiceproviderServices(): CancelablePromise<Array<RealtyServiceDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/serviceprovider/services',
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static putApiServiceproviderServices(
id: number,
requestBody?: RealtyServiceUpdate,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/serviceprovider/services/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

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