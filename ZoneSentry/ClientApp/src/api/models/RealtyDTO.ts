/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';

export type RealtyDTO = {
    id?: number;
    number?: number;
    houseId?: number;
    owner?: ApplicationUserDTO;
    ownedByCompany?: boolean;
    rentAgreements?: Array<number> | null;
    currentRentAgreement?: number | null;
};