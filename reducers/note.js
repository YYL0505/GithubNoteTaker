const note = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return [
                ...state,
                {
                    //add note here
                }
            ];
        default:
            return state
    }
};

export default note;
