import { CONSTANTS } from "../types/types";

let listId = 2;
let _id = 8;

const initialState = {
    lists: [
        {
            dStart: "all-lists",
            title: "IN PROGRESS",
            listId: `list-${0}`,
            position: 0,
            cards: [
                {
                    id: `card-${0}`,
                    text: "created static 1"
                },
                {
                    id: `card-${1}`,
                    text: "created static 2"
                },
                {
                    id: `card-${2}`,
                    text: "created static 3"
                },
            ]
        },
        {
            dStart: "all-lists",
            title: "TO DO",
            listId: `list-${1}`,
            position: 1,
            cards: [
                {
                    id: `card-${3}`,
                    text: "created static 1"
                },
                {
                    id: `card-${4}`,
                    text: "created static 2"
                },
                {
                    id: `card-${5}`,
                    text: "created static 3"
                },
                {
                    id: `card-${6}`,
                    text: "created static 4"
                },
                {
                    id: `card-${7}`,
                    text: "created static 5"
                }
            ]
        },
    ]
}

export const listsReducer = (state = initialState, action) => {

    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            console.log(action.payload.text)
            const newList = {
                title: action.payload.text,
                listId: `list-${listId}`,
                cards: []
            }
            listId += 1
            return { ...state, lists: [...state.lists, newList] }

        case CONSTANTS.ADD_CARD:
            const newCard = {
                text: action.payload.text,
                id: `card-${_id}`,
            }
            _id += 1

            const newState = state.lists.map(list => {
                if (list.listId === action.payload.listId) {
                    return { ...list, cards: [...list.cards, newCard] }
                }
                else {
                    return list
                }
            })
            return { lists: newState }

        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                draggableId,
                type
            } = action.payload;

            const copyState = { ...state }

            if (type === "list") {
                const list = copyState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list)
                return copyState;
            }


            if (droppableIdStart === "all-lists") {
                // const listStart = state.lists.find(list => droppableIndexStart === list.position)
                const listStart = state.lists.find(list => droppableIndexStart === list.position)
                // const listEnd = state.lists.find(list => droppableIndexEnd === list.position)
                // const positionStart = listStart.position
                // const positionEnd = listEnd.position
                const startIndex = listStart.position
                const indexState = state.lists.indexOf(startIndex)
                console.log(indexState)

                // console.log(droppableIndexStart, "droppableIndexStart")
                // console.log(droppableIndexEnd, "droppableIndexEnd")
                // console.log(copyState)

                // if (droppableIndexStart < droppableIndexEnd) {
                //     state.lists.sort((a, b) => b.position - a.position)
                // }
                if (droppableIndexStart < droppableIndexEnd) {
                    state.lists.sort((a, b) => b.position - a.position)
                }
                else state.lists.sort((a, b) => a.position - b.position)
                
                // else state.lists.sort((a, b) => a.position - b.position)
                // else if (droppableIndexStart > droppableIndexEnd && position) {
                //     console.log(">")
                //     state.lists.sort((a, b) => a.position - b.position)
                // } 
                // else state.lists.sort((a, b) => a.position - b.position)
                // else if (!droppableIndexStart < droppableIndexEnd && !position) {
                //     console.log("&&")
                //     state.lists.sort((a, b) => b.position - a.position)
                // }
            }

            if (droppableIdStart !== droppableIdEnd) {
                console.log(droppableIdStart, droppableIdEnd)
                const listStart = state.lists.find(list => droppableIdStart === list.listId)
                const card = listStart.cards.splice(droppableIndexStart, 1)
                const listEnd = state.lists.find(list => droppableIdEnd === list.listId)
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            } else if (droppableIdStart !== "all-lists") {
                const list = state.lists.find(list => droppableIdStart === list.listId)
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
                return { ...state, [droppableIdStart]: list };
            }

            return copyState;

        default:
            return state;
    }
}

