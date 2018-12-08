import React, { Component } from 'react';

import { Button } from 'antd';

import './index.less';

export default class TestHandleOtherSite extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleClick = () => {
        console.log('--handleClick--', window.require('path'));

        const { BrowserWindow } = window.require('electron').remote;

        // const windowID = BrowserWindow.getFocusedWindow().id;
        let win = new BrowserWindow({
            width: 1000,
            height: 600,
            webPreferences: {
                nodeIntegration: false
            }
        });

        win.openDevTools();

        win.loadURL('https://www.qq.com');

        win.webContents.on('did-finish-load', () => {
            // const input = 100;
            // win.webContents.send('compute-factorial', input, windowID);

            // 如果有先去跳转的场景，则此处会触发两次，因此获取 cookie 时需要先核对域名

            console.log('---------did-finish-load--------');
            console.log('---------win.webContents.getURL()--------', win.webContents.getURL());
            console.log('---------win.webContents.getTitle()--------', win.webContents.getTitle());
            win.webContents.executeJavaScript('document.cookie', (result) => {
                console.log('---------document.cookie 2------', result);
            });
        });

        // const searchVal = 'hello,world!';

        // Once dom-ready
        // win.webContents.once('dom-ready', () => {
        //     // 建议
        //     win.webContents.executeJavaScript(`
        //       console.log("This loads no problem!${searchVal}");
        //
        //       // document.querySelector('#sosobar').parentNode.remove();
        //      document.querySelector('#sougouTxt').value = '${searchVal}'
        //      document.querySelector('#searchBtn').click();
        //     `, (result) => {
        //         console.log('===result', result);
        //         setTimeout(() => {
        //             win.close();
        //         }, 3000);
        //     });
        // });
    };

    render() {

        return (
            <div className="page-test-handle-other-site">
                <Button onClick={this.handleClick}>测试打开 www.qq.com</Button>
            </div>
        );
    }
}
