const initialState = {
    userInfo: undefined,
    username: '',
    isLoading: false,
    error: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return Object.assign({}, state, {
                userInfo: action.userInfo,
                username: '',
                isLoading: false,
                error: false
            });
        case 'TOGGLE_LOADING':
            return Object.assign({}, state, {
                isLoading: !state.isLoading,
            });
        case 'UPDATE_USERNAME':
            return Object.assign({}, state, {
                username: action.username,
                
            });
        case 'SET_ERROR':
            return Object.assign({}, state, {
                error: action.error,
                isLoading: false,
            });
        default:
            return state;
    }
};

export default user;
