const initialState = {
    userInfo: undefined,
    username: '',
    error: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_USER':
            return Object.assign({}, state, {
                userInfo: action.userInfo,
                username: '',
                error: false
            });
        case 'UPDATE_USERNAME':
            return Object.assign({}, state, {
                username: action.username,
                
            });
        case 'SET_ERROR':
            return Object.assign({}, state, {
                error: action.error,
            });
        default:
            return state;
    }
};

export default user;
