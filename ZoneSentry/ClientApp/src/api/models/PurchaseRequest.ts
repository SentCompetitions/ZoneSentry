/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { Realty } from './Realty';

export type PurchaseRequest = {
    id?: number;
    sellCost?: number;
    realty?: Realty;
    newOwner?: ApplicationUser;
};