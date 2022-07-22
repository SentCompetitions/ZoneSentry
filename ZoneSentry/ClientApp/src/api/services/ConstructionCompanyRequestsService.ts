/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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

}