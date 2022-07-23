/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RealtyStatus } from './RealtyStatus';

export type RealtyUpdate = {
    id?: number;
    paymentPerMonth?: number | null;
    sellCost?: number | null;
    realtyStatus?: RealtyStatus;
};