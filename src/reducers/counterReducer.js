const INCREMENT_REQUEST = 'INCREMENT_REQUEST';
const INCREMENT_SUCCESS = 'INCREMENT_SUCCESS';
const INCREMENT_FAILURE = 'INCREMENT_FAILURE';

const initialState = {
    fetching: false,
    count: 0,
    error: null
};


export function counterReducer(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_REQUEST:
            return {fetching: true, count: state.count, error: null}
        case INCREMENT_SUCCESS:
            return {fetching: false, count: state.count + 1, error: null}
        case INCREMENT_FAILURE:
            return {fetching: false, count: state.count, error: action.error}
        default:
            return state
    }
}