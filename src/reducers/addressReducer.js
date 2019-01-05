const SET_ADDRESS_REQUEST = 'SET_ADDRESS_REQUEST';
const SET_ADDRESS_REGISTER = 'SET_ADDRESS_REGISTER';
const SET_ADDRESS_MODIFY = 'SET_ADDRESS_MODIFY';
const SET_ADDRESS_FAILURE = 'SET_ADDRESS_FAILURE';

const initialState = {
    loading:false,
    error:null,
    registerModal:false,
    modifyModal:false
};

export function addressReducer(state = initialState, action){
    switch (action.type) {
        case SET_ADDRESS_REQUEST:
            return {...state, loading:true, error:null};
        case SET_ADDRESS_REGISTER:
            return {...state, loading:false, registerModal:!state.registerModal};
        case SET_ADDRESS_MODIFY:
            return {...state, loading:false, modifyModal:!state.modifyModal};
        case SET_ADDRESS_FAILURE:
            return {...state, loading:false, modal:false, error:action.error};
        default:
            return state;
    }
}