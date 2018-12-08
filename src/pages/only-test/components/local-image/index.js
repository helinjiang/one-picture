import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card, Divider, Layout } from 'antd';
import './index.less';
import { DescriptionList } from 'ant-design-pro';

const { Header, Content, Footer } = Layout;

const { Description } = DescriptionList;

class Workspace extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="page-workspace-dashboard">
                <p>local image</p>
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

export default connect(mapStateToProps)(Workspace);
