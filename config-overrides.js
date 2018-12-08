const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', [{
        libraryName: 'antd',
        style: true
    }, {
        libraryName: 'ant-design-pro',
        libraryDirectory: 'lib',
        style: true,
        camel2DashComponentName: false
    }]], config);

    // https://github.com/ant-design/ant-design/issues/7927
    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' }
    })(config, env);

    // console.log(config);

    // 使用了 electron-renderer-react-scripts-target 自动增加了这个
    // 但实际上加入这个之后，会报错 require is undefined 错误，因此删除之
    // config.target = 'electron-renderer';
    delete config.target;

    return config;
};