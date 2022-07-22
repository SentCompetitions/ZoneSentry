/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { ResidentialComplex } from './ResidentialComplex';

export type ConstructionCompany = {
    id?: number;
    name?: string | null;
    country?: string | null;
    employees?: Array<ApplicationUser> | null;
    residentialComplexes?: Array<ResidentialComplex> | null;
};