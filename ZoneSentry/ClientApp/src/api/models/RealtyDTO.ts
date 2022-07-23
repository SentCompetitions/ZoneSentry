/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';
import type { RealtyStatus } from './RealtyStatus';

export type RealtyDTO = {
    id?: number;
    number?: number;
    paymentPerMonth?: number | null;
    sellCost?: number | null;
    area?: number;
    planUrl?: string | null;
    houseId?: number;
    realtyStatus?: RealtyStatus;
    owner?: ApplicationUserDTO;
    ownedByCompany?: boolean;
    rentAgreements?: Array<number> | null;
    currentRentAgreement?: number | null;
};