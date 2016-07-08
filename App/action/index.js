export const fetchNotes = (notes, userInfo) => {
    return {
        type: 'FETCH_NOTES',
        notes: notes,
        userInfo: userInfo
    }
};

export const setNote = (note) => {
    return {
        type: 'SET_NOTE',
        note: note
    }
};

export const fetchUser = (userInfo) => {
    return {
        type: 'FETCH_USER',
        userInfo: userInfo
    }
};

export const setUser = (username) => {
    return {
        type: 'UPDATE_USERNAME',
        username: username
    }
};

export const setError = (error) => {
    return {
        type: 'SET_ERROR',
        error: error
    }
};

export const toggleLoadingOn = () => {
    return {
        type: 'TOGGLE_LOADING_ON',
    }
};

export const toggleLoadingOff = () => {
    return {
        type: 'TOGGLE_LOADING_OFF',
    }
};