/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserDTO } from './ApplicationUserDTO';

export type RealtyServiceDTO = {
    id?: number;
    name?: string | null;
    cost?: number;
    provider?: ApplicationUserDTO;
};