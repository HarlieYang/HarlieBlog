import React,{Component,Fragment} from 'react'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import { setCurPageInfo } from "@/store/actions";

import { Menu, Icon } from 'antd';
import './index.css'
const { SubMenu } = Menu;

class Admin extends Component {
    	// 监听state状态改变
	constructor(props) {
		super(props);
		this.state = {
			subIndex: props.curPageInfo.subIndex,
			curPageInfo: props.curPageInfo,
		};
	}
	componentWillReceiveProps(nextprops) {
		this.setState({
			subIndex: nextprops.curPageInfo.subIndex,
		});
	}
    handleClick = e => {
        console.log('click ', e);
    };
    onToggle(openKeys) {
        this.setState({
            subIndex: [ openKeys[1] ],
        });
        // this.props.setCurPageInfo({...this.props.curPageInfo,subIndex: [openKeys[1]]})
    }
    render() {
        return (
            <Fragment>
                <div className='admin-nav'>
                    <div className="logo">Harlie博客后台</div>
                    <Menu
                        onOpenChange={this.onToggle.bind(this)}
                        selectedKeys={this.props.curPageInfo.index}
                        openKeys={this.state.subIndex}
                        inlineCollapsed={false}
                        mode="inline"
                        theme="dark"
                        style={{ height: "100%", fontSize: "22px" }}
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="appstore" />
                                    <span>技术分类</span>
                                </span>
                            }>
                            <Menu.Item key="1">
                                <Link to='/admin/sortList'>分类列表</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/admin/sortAdd'>分类添加</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={
                                <span>
                                    <Icon type="setting" />
                                    <span>技术内容</span>
                                </span>
                            }>
                            <Menu.Item key="3">
                                <Link to='/admin/articlelist'>技术列表</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to='/admin/articleadd'>技术添加</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className='admin-children-con'>
                        {this.props.children}
                    </div>
                </div>
                
        </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		curPageInfo: state.curPageInfo
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setCurPageInfo: (info) => dispatch(setCurPageInfo(info))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);