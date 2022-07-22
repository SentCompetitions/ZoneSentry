/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { House } from './House';
import type { RentAgreement } from './RentAgreement';

export type Realty = {
    id?: number;
    number?: number;
    house?: House;
    houseId?: number;
    owner?: ApplicationUser;
    ownedByCompany?: boolean;
    rentAgreements?: Array<RentAgreement> | null;
    currentRentAgreement?: RentAgreement;
};