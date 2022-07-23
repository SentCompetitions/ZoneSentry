/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Realty } from './Realty';
import type { RealtyService } from './RealtyService';
import type { ResidentialComplex } from './ResidentialComplex';

export type House = {
    id?: number;
    street?: string | null;
    houseNumber?: number;
    building?: number | null;
    district?: string | null;
    housing?: number | null;
    latitude?: number;
    longitude?: number;
    residentialComplex?: ResidentialComplex;
    residentialComplexId?: number;
    realties?: Array<Realty> | null;
    realtyServices?: Array<RealtyService> | null;
};