/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { House } from './House';
import type { PurchaseRequest } from './PurchaseRequest';
import type { RealtyStatus } from './RealtyStatus';
import type { RentAgreement } from './RentAgreement';
import type { RentRequest } from './RentRequest';

export type Realty = {
    id?: number;
    number?: number;
    paymentPerMonth?: number | null;
    sellCost?: number | null;
    house?: House;
    houseId?: number;
    owner?: ApplicationUser;
    ownedByCompany?: boolean;
    realtyStatus?: RealtyStatus;
    rentAgreements?: Array<RentAgreement> | null;
    rentRequests?: Array<RentRequest> | null;
    purchaseRequests?: Array<PurchaseRequest> | null;
    currentRentAgreement?: RentAgreement;
};