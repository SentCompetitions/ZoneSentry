/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUser } from './ApplicationUser';
import type { ConstructionCompany } from './ConstructionCompany';
import type { PaymentState } from './PaymentState';
import type { RealtyServiceOrder } from './RealtyServiceOrder';

export type RealtyServicePayment = {
    id?: number;
    payment?: number;
    paymentState?: PaymentState;
    dueDate?: string;
    periodStart?: string;
    periodEnd?: string;
    constructionCompany?: ConstructionCompany;
    orderer?: ApplicationUser;
    realtyServiceOrder?: RealtyServiceOrder;
};