/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentState } from './PaymentState';
import type { RentAgreementUserView } from './RentAgreementUserView';

export type RentPaymentUserView = {
    id?: number;
    payment?: number;
    paymentState?: PaymentState;
    dueDate?: string;
    periodStart?: string;
    periodEnd?: string;
    rentAgreement?: RentAgreementUserView;
};