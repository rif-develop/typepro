//윈도우 너비 state
const SET_WINDOW_WIDTH_REQUEST = 'SET_WINDOW_WIDTH_REQUEST';
const SET_WINDOW_WIDTH_SUCCESS = 'SET_WINDOW_WIDTH_SUCCESS';
const SET_WINDOW_WIDTH_FAILURE = 'SET_WINDOW_WIDTH_FAILURE';

const initialState = {
    loading:false,
    error:null,
    width:window.innerWidth && document.documentElement.clientWidth ?
        Math.min(window.innerWidth, document.documentElement.clientWidth) :
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName('body')[0].clientWidth
};

export function clientStatusReducer(state = initialState, action){
    switch (action.type) {
        case SET_WINDOW_WIDTH_REQUEST:
            return {...state, loading:true, error:null, width:state.width}
        case SET_WINDOW_WIDTH_SUCCESS:
            return {...state, loading:false, error:null, width:action.width}
        case SET_WINDOW_WIDTH_FAILURE:
            return {...state, loading:false, error:action.error}
        default:
            return state
    }
}