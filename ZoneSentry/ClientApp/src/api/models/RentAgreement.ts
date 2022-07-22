/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { Realty } from './Realty';
import type { RentPayment } from './RentPayment';

export type RentAgreement = {
    id?: number;
    date?: string;
    expirationDate?: string;
    paymentPerMonth?: number;
    realty?: Realty;
    owner?: ApplicationUser;
    ownedByCompany?: boolean;
    tenant?: ApplicationUser;
    payments?: Array<RentPayment> | null;
};