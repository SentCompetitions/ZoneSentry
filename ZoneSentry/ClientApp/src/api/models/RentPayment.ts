/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentState } from './PaymentState';
import type { RentAgreement } from './RentAgreement';

export type RentPayment = {
    id?: number;
    payment?: number;
    paymentState?: PaymentState;
    paymentDate?: string | null;
    dueDate?: string;
    periodStart?: string;
    periodEnd?: string;
    rentAgreement?: RentAgreement;
};