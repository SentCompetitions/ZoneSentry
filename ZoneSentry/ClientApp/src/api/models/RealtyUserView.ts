/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';
import type { HouseUserView } from './HouseUserView';

export type RealtyUserView = {
    id?: number;
    number?: number;
    paymentPerMonth?: number | null;
    sellCost?: number | null;
    houseId?: number;
    owner?: ApplicationUserDTO;
    ownedByCompany?: boolean;
    house?: HouseUserView;
};