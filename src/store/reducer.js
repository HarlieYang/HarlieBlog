let defaultState = {
    curPageInfo: {},
    userInfo: {}
}

const reducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PAGE_INFO':
            return Object.assign({}, state, {
              curPageInfo: action.pageInfo,
            });
        default:
            return state
    }
}
export default reducers;