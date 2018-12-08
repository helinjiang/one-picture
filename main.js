const path = require('path');
const url = require('url');
const glob = require('glob');

const { app, BrowserWindow } = require('electron');

const debug = /--debug/.test(process.argv[2]);

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow = null;

function initialize() {
    // 单一的实例
    makeSingleInstance();

    // 引入其他的 main process 模块
    loadMainProcessModules();

    /**
     * 创建窗口
     */
    function createWindow() {
        const windowOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: app.getName()
        };

        // if (process.platform === 'linux') {
        //     windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png');
        // }

        // 创建浏览器窗口
        mainWindow = new BrowserWindow(windowOptions);

        if (debug) {
            // 加载应用 适用于 react 项目
            mainWindow.loadURL('http://localhost:3000/');

            // 打开开发者工具
            mainWindow.webContents.openDevTools();
            mainWindow.maximize();
            require('devtron').install();
        } else {
            // 加载应用 构建之后的路径
            mainWindow.loadURL(
                url.format({
                    pathname: path.join(__dirname, './build/index.html'),
                    protocol: 'file:',
                    slashes: true
                })
            );
        }

        // 关闭window时触发下列事件.
        mainWindow.on('closed', () => {
            mainWindow = null;
        });
    }

    // 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
    app.on('ready', () => {
        createWindow();
    });

    // 所有窗口关闭时退出应用.
    app.on('window-all-closed', () => {
        // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
        if (mainWindow === null) {
            createWindow();
        }
    });
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) {
        return;
    }

    app.requestSingleInstanceLock();

    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

/**
 * 将 main-process 文件夹下的所有模块都引入
 */
function loadMainProcessModules() {
    const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'));

    files.forEach((file) => {
        require(file);
    });
}

// 执行初始化操作
initialize();