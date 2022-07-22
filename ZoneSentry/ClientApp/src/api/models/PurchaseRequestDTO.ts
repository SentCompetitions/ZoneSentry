/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';
import type { RealtyUserView } from './RealtyUserView';

export type PurchaseRequestDTO = {
    id?: number;
    paymentPerMonth?: number;
    durationInMonths?: number;
    realty?: RealtyUserView;
    tenant?: ApplicationUserDTO;
};