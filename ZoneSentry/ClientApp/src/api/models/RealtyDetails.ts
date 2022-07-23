/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';
import type { HouseUserView } from './HouseUserView';
import type { RentAgreementDTO } from './RentAgreementDTO';

export type RealtyDetails = {
    currentRentAgreement?: RentAgreementDTO;
    id?: number;
    number?: number;
    paymentPerMonth?: number | null;
    sellCost?: number | null;
    area?: number;
    houseId?: number;
    owner?: ApplicationUserDTO;
    ownedByCompany?: boolean;
    house?: HouseUserView;
};