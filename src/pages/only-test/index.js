import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Layout } from 'antd';

import Dashboard from './components/dashboard';
import LocalImage from './components/local-image';
import LoadProject from './components/load-project';
import TestHandleOtherSite from './components/test-handle-other-site';

import './index.less';

export default function OnlyTestContainer(props) {
    let { match } = props;

    return (
        <Layout className="page-workspace">
            <Layout.Content>

                <h1>仅仅用于调试而已</h1>
                <LoadProject />

                <TestHandleOtherSite/>

                <NavLink to={`${match.url}/local-image`}>本地图片展示</NavLink>

                <Route exact path={match.url} component={Dashboard} />
                <Route path={`${match.url}/local-image`} component={LocalImage} />

            </Layout.Content>
        </Layout>
    );
}

