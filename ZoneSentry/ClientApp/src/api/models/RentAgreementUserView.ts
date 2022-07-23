/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';
import type { RealtyUserView } from './RealtyUserView';

export type RentAgreementUserView = {
    id?: number;
    date?: string;
    expirationDate?: string;
    paymentPerMonth?: number;
    realty?: RealtyUserView;
    owner?: ApplicationUserDTO;
    ownedByCompany?: boolean;
    tenant?: ApplicationUserDTO;
};