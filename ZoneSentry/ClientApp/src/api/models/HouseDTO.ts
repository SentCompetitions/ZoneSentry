/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type HouseDTO = {
    id?: number;
    street?: string | null;
    houseNumber?: number;
    building?: number | null;
    district?: string | null;
    housing?: number | null;
    residentialComplexId?: number;
    realties?: Array<number> | null;
};