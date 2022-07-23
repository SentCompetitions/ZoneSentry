import {HouseUserView, RealtyUserView, ResidentialComplexUserView} from "../src/api";

export function realtyToAddressString(r: RealtyUserView) {
    return `${houseToAddressString(r.house)}, №${r.number}`
}

export function houseToAddressString(r: HouseUserView | undefined) {
    return `${complexToAddressString(r?.residentialComplex)}, ул. ${r?.street}, д. ${r?.houseNumber}`
}

export function complexToAddressString(r: ResidentialComplexUserView | undefined) {
    return `г. ${r?.city}`
}