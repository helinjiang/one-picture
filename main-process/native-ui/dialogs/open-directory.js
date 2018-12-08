const { ipcMain, dialog } = require('electron');

/**
 * 监听打开文件夹的事件
 *
 * @param {Object} event 事件对象
 * @param {Object} [opts] 额外的参数，用于处理某些逻辑
 */
ipcMain.on('open-directory-dialog', (event, opts) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, (files) => {
        // 注意 files 为只有一个元素的数组，但选择文件夹时只能单选，因此此处直接返回第一个元素即可
        if (files && files.length) {
            event.sender.send('selected-directory', files[0], opts);
        }
    });
});
