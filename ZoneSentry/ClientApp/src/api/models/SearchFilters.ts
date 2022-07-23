/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RealtyStatus } from './RealtyStatus';

export type SearchFilters = {
    realtyStatus?: RealtyStatus;
    city?: string | null;
    areaMin?: number | null;
    areaMax?: number | null;
    priceMin?: number | null;
    priceMax?: number | null;
};