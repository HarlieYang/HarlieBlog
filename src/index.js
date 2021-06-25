import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import { Provider } from 'react-redux';
import store from '@/store/index'
import App from '@/view/app.js';
import './index.css';

// 设置中文
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from 'antd'
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

ReactDOM.render(
    <Provider  store={store}>
        <Router>
            <ConfigProvider locale={zhCN}>
                <App />
            </ConfigProvider>
        </Router>
    </Provider>,
 document.getElementById('root')
);
