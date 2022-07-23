/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';

export type RentAgreementDTO = {
    id?: number;
    date?: string;
    expirationDate?: string;
    paymentPerMonth?: number;
    ownedByCompany?: boolean;
    tenant?: ApplicationUserDTO;
};