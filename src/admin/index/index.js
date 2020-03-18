import React,{Component,Fragment} from 'react'
import { Menu, Icon, Row, Col } from 'antd';
import {Link} from 'react-router-dom'
import './index.css'
const { SubMenu } = Menu;

class Admin extends Component {
  handleClick = e => {
    console.log('click ', e);
  };
  render() {
    return (
        <Fragment>
            <div className='admin-header'>
                <Row>
                    <Col span={1}></Col>
                    <Col span={10}>HarlieYang 博客管理</Col>
                    <Col span={10}></Col>
                </Row>
            </div>
            <div className='admin-content'>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: '18%' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <Icon type="appstore" />
                        <span>技术分类</span>
                        </span>
                    }
                    >
                        <Menu.Item key="1">
                            <Link to='/admin/sortList'>分类列表</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to='/admin/sortAdd'>分类添加</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                    key="sub4"
                    title={
                        <span>
                        <Icon type="setting" />
                        <span>技术内容</span>
                        </span>
                    }
                        >
                        <Menu.Item key="3">
                            <Link to='/admin/sortConList'>技术列表</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to='/admin/sortConAdd'>技术添加</Link>
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

export default Admin;