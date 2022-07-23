/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyServicePaymentDTO } from '../models/RealtyServicePaymentDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ConstructionCompanyServicesPaymentService {

    /**
     * @param realtyId 
     * @returns RealtyServicePaymentDTO Success
     * @throws ApiError
     */
    public static getApiConstructioncompanyservicespaymentPayments(
realtyId?: number,
): CancelablePromise<Array<RealtyServicePaymentDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/constructioncompanyservicespayment/payments',
            query: {
                'realtyId': realtyId,
            },
        });
    }

    /**
     * @param paymentId 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiConstructioncompanyservicespaymentPaymentsPay(
paymentId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/constructioncompanyservicespayment/payments/{paymentId}/pay',
            path: {
                'paymentId': paymentId,
            },
        });
    }

}