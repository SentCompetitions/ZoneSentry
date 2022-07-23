/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatsEntry } from '../models/StatsEntry';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConstructionCompanyStatsService {

    /**
     * @param realtyId 
     * @returns StatsEntry Success
     * @throws ApiError
     */
    public static getApiConstructioncompanystatsCharts(
realtyId?: number,
): CancelablePromise<Array<StatsEntry>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompanystats/charts',
            query: {
                'realtyId': realtyId,
            },
        });
    }

}