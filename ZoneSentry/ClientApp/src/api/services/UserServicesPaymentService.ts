/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RealtyServicePaymentDTO } from '../models/RealtyServicePaymentDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserServicesPaymentService {

    /**
     * @param realtyId 
     * @returns RealtyServicePaymentDTO Success
     * @throws ApiError
     */
    public static getApiUserservicespaymentPayments(
realtyId?: number,
): CancelablePromise<Array<RealtyServicePaymentDTO>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/userservicespayment/payments',
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
    public static postApiUserservicespaymentPaymentsPay(
paymentId: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/userservicespayment/payments/{paymentId}/pay',
            path: {
                'paymentId': paymentId,
            },
        });
    }

}