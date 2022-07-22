/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ConstructionCompanyDTO } from '../models/ConstructionCompanyDTO';
import type { HouseCreate } from '../models/HouseCreate';
import type { HouseDTO } from '../models/HouseDTO';
import type { RealtyCreate } from '../models/RealtyCreate';
import type { RealtyDTO } from '../models/RealtyDTO';
import type { ResidentialComplexCreate } from '../models/ResidentialComplexCreate';
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiConstructioncompanyComplexes(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/constructioncompany/complexes/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns ResidentialComplexDTO Success
     * @throws ApiError
     */
    public static postApiConstructioncompanyComplexes(
requestBody?: ResidentialComplexCreate,
): CancelablePromise<ResidentialComplexDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/constructioncompany/complexes',
            body: requestBody,
            mediaType: 'application/json-patch+json',
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiConstructioncompanyHouses(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/constructioncompany/houses/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns HouseDTO Success
     * @throws ApiError
     */
    public static postApiConstructioncompanyComplexesHouses(
id: number,
requestBody?: HouseCreate,
): CancelablePromise<HouseDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/constructioncompany/complexes/{id}/houses',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

    /**
     * @param id 
     * @returns RealtyDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompanyRealties(
id: number,
): CancelablePromise<RealtyDTO> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompany/realties/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiConstructioncompanyRealties(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/constructioncompany/realties/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns RealtyDTO Success
     * @throws ApiError
     */
    public static postApiConstructioncompanyHousesRealties(
id: number,
requestBody?: RealtyCreate,
): CancelablePromise<RealtyDTO> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/constructioncompany/houses/{id}/realties',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json-patch+json',
        });
    }

}