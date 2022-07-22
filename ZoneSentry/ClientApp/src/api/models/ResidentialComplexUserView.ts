/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConstructionCompanyUserView } from './ConstructionCompanyUserView';

export type ResidentialComplexUserView = {
    id?: number;
    name?: string | null;
    city?: string | null;
    constructionCompany?: ConstructionCompanyUserView;
};