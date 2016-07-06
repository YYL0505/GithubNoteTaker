import {ListView} from 'react-native';
const datas = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

const initialState = {
    notes: [],
    note: '',
    error: '',
    isLoading: false,
    dataSource: datas.cloneWithRows([])
};

const note = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_NOTES':
            console.log('FETCH_NOTES');
            let newNotes = action.notes;
            return {
                notes: newNotes,
                note: '',
                error: '',
                isLoading: false,
                dataSource: datas.cloneWithRows(newNotes)
            };
        case 'TOGGLE_LOADING':
            return Object.assign({}, state, {
                isLoading: !state.isLoading,
            });
        case 'SET_NOTE':
            return Object.assign({}, state, {
                note: action.note,
            });
        default:
            return state;
    }
};

export default note;
