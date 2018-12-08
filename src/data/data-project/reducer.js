import { PROJECT_REQUEST, PROJECT_REQUEST_FAIL, PROJECT_REQUEST_SUCCESS } from './action';

const initialState = {
    isLoaded: false,
    isSuccess: false,
    data: {}
};

function mockerInfo(state = initialState, action) {
    let { type, data } = action,
        update = {};

    switch (type) {
        case PROJECT_REQUEST:
            update = {
                isLoaded: false,
                isSuccess: false
            };
            break;

        case PROJECT_REQUEST_SUCCESS:
            update = {
                isLoaded: true,
                isSuccess: true,
                data: data.result
            };

            break;

        case PROJECT_REQUEST_FAIL:
            update = {
                isLoaded: true,
                isSuccess: false
            };
            break;

        default:
            break;
    }

    return Object.keys(update).length ? Object.assign({}, state, update) : state;
}

export default mockerInfo;

