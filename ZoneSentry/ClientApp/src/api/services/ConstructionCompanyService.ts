/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConstructionCompanyDTO } from '../models/ConstructionCompanyDTO';
import type { HouseDTO } from '../models/HouseDTO';
import type { RealtyDTO } from '../models/RealtyDTO';
import type { ResidentialComplexDTO } from '../models/ResidentialComplexDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConstructionCompanyService {

    /**
     * @returns ConstructionCompanyDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompany(): CancelablePromise<ConstructionCompanyDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompany',
        });
    }

    /**
     * @param id 
     * @returns ResidentialComplexDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompanyComplexes(
id: number,
): CancelablePromise<ResidentialComplexDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompany/complexes/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns HouseDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompanyHouses(
id: number,
): CancelablePromise<HouseDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompany/houses/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns RealtyDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompanyRealities(
id: number,
): CancelablePromise<RealtyDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompany/realities/{id}',
            path: {
                'id': id,
            },
        });
    }

}