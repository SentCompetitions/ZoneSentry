/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { Realty } from './Realty';

export type RentRequest = {
    id?: number;
    paymentPerMonth?: number;
    durationInMonths?: number;
    realty?: Realty;
    tenant?: ApplicationUser;
};