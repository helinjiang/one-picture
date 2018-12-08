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

        this.state = {
            showImg: null
        };
    }

    componentDidMount() {
        const nativeImage = window.require('electron').nativeImage;

        // let image = nativeImage.createFromPath('D:\\test.jpg');
        // let image = nativeImage.createFromPath('/test.jpg');
        console.log(image);

        this.setState({
            showImg: image.toDataURL()
        });
    }

    render() {
        const { showImg } = this.state;
        return (
            <div className="page-workspace-dashboard">
                <p>local image</p>
                {
                    showImg ? <img src={showImg} style={{ width: 200, height: 200 }} /> : null
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

export default connect(mapStateToProps)(Workspace);
