const path = require('path');
const { ipcMain, dialog } = require('electron');

const { EVENT } = require('../../src/business/electron-main-render-common');

/**
 * 获得项目的信息
 *
 * @param {Object} event 事件对象
 * @param {Object} [opts] 额外的参数，用于处理某些逻辑
 */
ipcMain.on(EVENT.PROJECT_INFO.REQ, (event, opts) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, (files) => {
        // 注意 files 为只有一个元素的数组，但选择文件夹时只能单选，因此此处直接返回第一个元素即可
        if (!files || !files.length) {
            event.sender.send(EVENT.PROJECT_INFO.RSP, {
                retcode: -1,
                msg: '没有选择目录！'
            }, opts);
            return;
        }

        const projectFolder = files[0];

        // 获取 projects/generator/startkit.config.js 的信息
        const startkitConfig = require(path.join(projectFolder, 'projects/generator/startkit.config.js'));

        // 获取 project.js 的信息

        // 获取 feflow.js 或 feflow.json 的信息

        // 获取其他信息

        // 最好有一个缓存文件

        event.sender.send(EVENT.PROJECT_INFO.RSP, {
            retcode: 0,
            result: {
                projectFolder,
                startkitConfig
            }
        }, opts);
    });
});
