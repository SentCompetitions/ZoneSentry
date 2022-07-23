/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyUserView } from '../models/RealtyUserView';
import type { SearchFilters } from '../models/SearchFilters';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserSerarchService {

    /**
     * @param requestBody 
     * @returns RealtyUserView Success
     * @throws ApiError
     */
    public static postApiUserserarch(
requestBody?: SearchFilters,
): CancelablePromise<Array<RealtyUserView>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/userserarch',
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}