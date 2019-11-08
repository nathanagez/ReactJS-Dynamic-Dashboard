import { CLOSE_WIDGET } from "./widgets.types"

export const closeWidget = (id: number) => {
    return {
        type: CLOSE_WIDGET,
        payload: id
    };
}