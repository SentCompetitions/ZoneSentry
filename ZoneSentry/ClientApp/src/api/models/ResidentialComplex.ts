/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConstructionCompany } from './ConstructionCompany';
import type { House } from './House';

export type ResidentialComplex = {
    id?: number;
    name?: string | null;
    city?: string | null;
    constructionCompany?: ConstructionCompany;
    constructionCompanyId?: number;
    houses?: Array<House> | null;
};