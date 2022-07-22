/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyDTO } from '../models/RealtyDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserRealtiesRentedService {

    /**
     * @returns RealtyDTO Success
     * @throws ApiError
     */
    public static getApiUserrealtiesrented(): CancelablePromise<Array<RealtyDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userrealtiesrented',
        });
    }

}