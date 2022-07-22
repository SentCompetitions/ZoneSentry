/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RentAgreement } from './RentAgreement';

export type RentPayment = {
    id?: number;
    payment?: number;
    rentAgreement?: RentAgreement;
};