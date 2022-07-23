/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { Realty } from './Realty';
import type { RealtyService } from './RealtyService';
import type { RealtyServicePayment } from './RealtyServicePayment';

export type RealtyServiceOrder = {
    id?: number;
    cost?: number;
    date?: string;
    realty?: Realty;
    realtyService?: RealtyService;
    payments?: Array<RealtyServicePayment> | null;
    companyOrdered?: boolean;
    orderer?: ApplicationUser;
};