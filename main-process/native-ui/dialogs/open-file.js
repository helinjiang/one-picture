const { ipcMain, dialog } = require('electron');

/**
 * 监听打开文件的事件
 *
 * @param {Object} event 事件对象
 * @param {Object} [opts] 额外的参数，用于处理某些逻辑
 */
ipcMain.on('open-file-dialog', (event, opts) => {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, (files) => {
        if (files) {
            event.sender.send('selected-file', files, opts);
        }
    });
});
