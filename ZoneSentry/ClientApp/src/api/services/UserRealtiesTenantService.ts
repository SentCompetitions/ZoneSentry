/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyUserView } from '../models/RealtyUserView';
import type { RentRequestCreate } from '../models/RentRequestCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserRealtiesTenantService {

    /**
     * @returns RealtyUserView Success
     * @throws ApiError
     */
    public static getApiUserrealtiestenant(): CancelablePromise<Array<RealtyUserView>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiestenant',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiUserrealtiestenantRequestrent(
requestBody?: RentRequestCreate,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/userrealtiestenant/requestrent',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}