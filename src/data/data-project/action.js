import { EVENT } from '../../business/electron-main-render-common';

export const PROJECT_REQUEST = 'PROJECT_REQUEST';
export const PROJECT_REQUEST_SUCCESS = 'PROJECT_REQUEST_SUCCESS';
export const PROJECT_REQUEST_FAIL = 'PROJECT_REQUEST_FAIL';

export function loadProject() {
    return (dispatch, getState) => {
        // 开始请求
        dispatch({
            type: PROJECT_REQUEST
        });

        return new Promise((resolve, reject) => {
            // 如果 window.require is undefined 则立即停止
            if (!window.require) {
                dispatch({
                    type: PROJECT_REQUEST_FAIL,
                    data: 'window.require is undefined!'
                });

                return reject({
                    retcode: 10086,
                    msg: 'window.require is undefined!'
                });
            }

            const { ipcRenderer } = window.require('electron');

            // 请求打开文件夹对话框
            ipcRenderer.send(EVENT.PROJECT_INFO.REQ);

            // 监听选择的文件夹路径
            ipcRenderer.once(EVENT.PROJECT_INFO.RSP, (event, data, opts) => {
                if (data.retcode === 0) {
                    dispatch({
                        type: PROJECT_REQUEST_SUCCESS,
                        data: data
                    });

                    resolve(data);
                } else {
                    dispatch({
                        type: PROJECT_REQUEST_FAIL,
                        data: data
                    });

                    reject(data);
                }
            });
        });
    };
}
