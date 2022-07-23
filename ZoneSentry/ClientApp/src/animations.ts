import {Target, Transition, Variants} from "framer-motion";

export const translition: Transition = {
    type: "spring",
    bounce: 0
}

export const initialUp: Target = {
    y: -300,
    opacity: 0,
}

export const enterUp: Target = {
    y: 0,
    opacity: 1
}

export const exitUp: Target = {
    y: -100,
    opacity: 0
}

export const upVariants: Variants = {
    "init": initialUp,
    "show": {
        ...enterUp, transition: {
            duration: 0.7,
            ...translition
        }
    },
    "hide": {
        ...exitUp, transition: {
            duration: 0.3,
            ...translition
        }
    }
}

export const initialOpacity: Target = {
    opacity: 0,
}

export const enterOpacity: Target = {
    opacity: 1
}

export const exitOpacity: Target = {
    opacity: 0
}

export const opacityVariants: Variants = {
    "init": initialOpacity,
    "show": {
        ...enterOpacity, transition: {
            duration: 0.7,
            ...translition
        }
    },
    "hide": {
        ...exitOpacity, transition: {
            duration: 0.3,
            ...translition
        }
    }
}