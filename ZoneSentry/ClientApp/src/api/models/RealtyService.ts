/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { House } from './House';

export type RealtyService = {
    id?: number;
    name?: string | null;
    cost?: number;
    provider?: ApplicationUser;
    scope?: Array<House> | null;
};