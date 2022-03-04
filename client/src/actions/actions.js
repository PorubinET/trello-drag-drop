import { CONSTANTS } from "../types/types";

export function addList(text) {
    return distpath => {
        try {
            distpath({
                type: CONSTANTS.ADD_LIST,
                payload: {text}
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export function addCard(listId, text) {
    return distpath => {
        try {
            distpath({
                type: CONSTANTS.ADD_CARD,
                payload: { listId, text }
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    type
    ) => {
        return {
        type: CONSTANTS.DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            type
        }
    }
}