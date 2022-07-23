/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';
import type { RealtyServiceDTO } from './RealtyServiceDTO';
import type { RealtyUserView } from './RealtyUserView';

export type RealtyServiceOrderDTO = {
    id?: number;
    cost?: number;
    date?: string;
    active?: boolean;
    realty?: RealtyUserView;
    realtyService?: RealtyServiceDTO;
    companyOrdered?: boolean;
    orderer?: ApplicationUserDTO;
};