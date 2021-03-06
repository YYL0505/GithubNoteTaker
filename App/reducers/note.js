import {ListView} from 'react-native';
const datas = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

const initialState = {
    userInfo: undefined,
    notes: [],
    note: '',
    dataSource: datas.cloneWithRows([])
};

const note = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_NOTES':
            let newNotes = action.notes;
            return {
                notes: newNotes,
                note: '',
                error: '',
                dataSource: datas.cloneWithRows(newNotes),
                userInfo: action.userInfo !== undefined ? action.userInfo : state.userInfo
            };
        case 'SET_NOTE':
            return Object.assign({}, state, {
                note: action.note,
            });
        default:
            return state;
    }
};

export default note;
