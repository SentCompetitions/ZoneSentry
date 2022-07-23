/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { StatsEntry } from '../models/StatsEntry';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserStatsService {

    /**
     * @param realtyId 
     * @returns StatsEntry Success
     * @throws ApiError
     */
    public static getApiUserstatsCharts(
realtyId?: number,
): CancelablePromise<Array<StatsEntry>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userstats/charts',
            query: {
                'realtyId': realtyId,
            },
        });
    }

    /**
     * @param userId 
     * @returns number Success
     * @throws ApiError
     */
    public static getApiUserstatsScore(
userId: number,
): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userstats/score/{userId}',
            path: {
                'userId': userId,
            },
        });
    }

}