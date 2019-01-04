const SET_MENU_REQUEST = 'SET_MENU_REQUEST';
const SET_MENU_SUCCESS = 'SET_MENU_SUCCESS';
const SET_MENU_FAILURE = 'SET_MENU_FAILURE';


const initialState = {
    loading:false,
    error:null,
    menu:'alarm' // alarm, measure, subscription, withdrawal
};

export function settingReducer(state = initialState, action){
    switch (action.type) {
        case SET_MENU_REQUEST:
            return {...state, loading:true, error:null};
        case SET_MENU_SUCCESS:
            return {...state, loading:false, error:null, menu:action.menu};
        case SET_MENU_FAILURE:
            return {...state, loading:false, error:action.error};
        default :
            return state;
    }
}




