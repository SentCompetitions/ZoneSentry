/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';
import type { ConstructionCompanyUserView } from './ConstructionCompanyUserView';
import type { PaymentState } from './PaymentState';
import type { RealtyServiceOrderDTO } from './RealtyServiceOrderDTO';

export type RealtyServicePaymentDTO = {
    id?: number;
    payment?: number;
    paymentState?: PaymentState;
    dueDate?: string;
    periodStart?: string;
    periodEnd?: string;
    constructionCompany?: ConstructionCompanyUserView;
    orderer?: ApplicationUserDTO;
    realtyServiceOrder?: RealtyServiceOrderDTO;
};