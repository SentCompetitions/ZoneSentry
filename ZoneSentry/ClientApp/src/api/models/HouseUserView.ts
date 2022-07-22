/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ResidentialComplexUserView } from './ResidentialComplexUserView';

export type HouseUserView = {
    id?: number;
    street?: string | null;
    houseNumber?: number;
    building?: number | null;
    district?: string | null;
    housing?: number | null;
    residentialComplex?: ResidentialComplexUserView;
};