/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Realty } from './Realty';
import type { ResidentialComplex } from './ResidentialComplex';

export type House = {
    id?: number;
    street?: string | null;
    houseNumber?: number;
    building?: number | null;
    district?: string | null;
    housing?: number | null;
    residentialComplex?: ResidentialComplex;
    residentialComplexId?: number;
    realties?: Array<Realty> | null;
};