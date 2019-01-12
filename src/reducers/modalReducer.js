const SET_MODAL_OPEN_REQUEST = 'SET_MODAL_OPEN_REQUEST';
const SET_MODAL_CLOSE_REQUEST = 'SET_MODAL_CLOSE_REQUEST';

const initialState = {
    modal: {
        open: false,
        type: null,
    }
};

export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MODAL_OPEN_REQUEST: {
            return {
                ...state, modal: {
                    open: true,
                    type: action.desc
                }
            };
        }
        case SET_MODAL_CLOSE_REQUEST: {
            return {
                ...state, modal: {
                    open: false,
                    type: null
                }
            };
        }
        default:{
            return state;
        }
    }
}