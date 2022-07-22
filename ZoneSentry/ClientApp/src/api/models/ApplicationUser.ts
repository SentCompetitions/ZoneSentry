/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ApplicationUserType } from './ApplicationUserType';
import type { ConstructionCompany } from './ConstructionCompany';
import type { Realty } from './Realty';

export type ApplicationUser = {
    type: ApplicationUserType;
    firstName?: string | null;
    lastName?: string | null;
    patronymic?: string | null;
    ownedRealties?: Array<Realty> | null;
    constructionCompany?: ConstructionCompany;
    id?: number;
    userName?: string | null;
    normalizedUserName?: string | null;
    email?: string | null;
    normalizedEmail?: string | null;
    emailConfirmed?: boolean;
    passwordHash?: string | null;
    securityStamp?: string | null;
    concurrencyStamp?: string | null;
    phoneNumber?: string | null;
    phoneNumberConfirmed?: boolean;
    twoFactorEnabled?: boolean;
    lockoutEnd?: string | null;
    lockoutEnabled?: boolean;
    accessFailedCount?: number;
};