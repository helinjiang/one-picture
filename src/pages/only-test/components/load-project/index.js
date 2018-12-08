import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';

import { loadProject } from '../../../../data/data-project';

import './index.less';

class LoadProject extends Component {
    constructor(props, context) {
        super(props, context);
    }

    handleLoadProject = () => {
        console.log('===handleLoadProject====');

        this.props.loadProject();
    };

    render() {

        const { isLoaded, isSuccess, data } = this.props;

        return (
            <div className="load-project">
                <Button size="large" onClick={this.handleLoadProject}>打开老项目</Button>

                <p>{isLoaded ? '已' : '尚未'}完成加载</p>

                {
                    isLoaded && isSuccess ? (
                        <div>
                            <p>恭喜，加载成功！</p>
                            <p>项目路径为： {data.projectFolder}</p>
                        </div>
                    ) : null
                }

                {
                    isLoaded && !isSuccess ? (
                        <div>
                            <p>很遗憾，加载失败！</p>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { projectInfo } = state;

    return {
        isLoaded: projectInfo.isLoaded,
        isSuccess: projectInfo.isSuccess,
        data: projectInfo.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadProject() {
            return dispatch(loadProject());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadProject);
