/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyUserView } from '../models/RealtyUserView';
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

}