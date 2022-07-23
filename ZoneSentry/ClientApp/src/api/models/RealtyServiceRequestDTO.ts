/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';
import type { RealtyServiceDTO } from './RealtyServiceDTO';
import type { RealtyUserView } from './RealtyUserView';

export type RealtyServiceRequestDTO = {
    id?: number;
    realtyService?: RealtyServiceDTO;
    realty?: RealtyUserView;
    companyOrdered?: boolean;
    orderer?: ApplicationUserDTO;
};