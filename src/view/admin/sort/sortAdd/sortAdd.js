import React, { Component, Fragment } from 'react'

import { requestPost } from '@/api/request'
import { PageHeader, Input, Row, Col, Button,message } from 'antd';

import './sortAdd.css';
class sortAdd extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            inputValue: null,
            sortTitleValue: null
        }
    }
    componentWillMount () {
    }
    addSort () {
        if (!this.state.inputValue) return false
        const params = {
            sortName: this.state.inputValue,
            sortTitle: this.state.sortTitleValue
        }
        requestPost('addSort', params).then(resp => {
            if(resp.status){
                message.success('创建成功')
                this.props.history.push({pathname: '/admin/sortList'})
            }
        })
    }
    inputChange (e) {
        const inputValue = e.target.value
        this.setState({
            inputValue: inputValue
        })
    }
    inputTitleChange (e) {
        const sortTitleValue = e.target.value
        this.setState({
            sortTitleValue: sortTitleValue
        })
    }
    render() {
        return (
            <Fragment>
                <PageHeader
                    style={{
                    border: '1px solid rgb(235, 237, 240)',
                    }}
                    
                    title="添加技术类别"
                    subTitle="添加分类"
                /> 
                <div className='sort-table'>
                    <Row className='add-row'>
                        <Col span={3}>
                            <span className='label-sort-name'>类别名称：</span>
                        </Col>
                        <Col span={11}>
                            <Input placeholder="类别名称" onChange={this.inputChange.bind(this)}/>
                        </Col>
                        <Col span={10}></Col>
                    </Row>
                    <Row className='add-row'>
                        <Col span={3}>
                            <span className='label-sort-name'>类别小标题：</span>
                        </Col>
                        <Col span={11}>
                            <Input placeholder="类别小标题" onChange={this.inputTitleChange.bind(this)}/>
                        </Col>
                        <Col span={10}></Col>
                    </Row>
                    <Row>
                        <Col span={12}></Col>
                        <Col span={4}>
                            <div className='submit-btn'>
                                <Button type="primary" htmlType="submit" onClick={this.addSort.bind(this)}>
                                    添加
                                </Button>
                            </div>
                        </Col>
                        <Col span={8}>
                        </Col>
                    </Row>
                    
                </div>
            </Fragment>
        );
    }
}

export default sortAdd;