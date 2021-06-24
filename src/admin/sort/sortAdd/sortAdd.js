import React,{Component,Fragment} from 'react'
import { PageHeader, Input, Row, Col, Button, message} from 'antd';

import axios from "axios";

import './sortAdd.css';

const success = function (con) {
    message.success(con);
};
const error = function (con) {
    message.error(con);
};
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
        axios({
			method: 'post',
            url: "/addSort",
            data: {
                sortName: this.state.inputValue,
                sortTitle: this.state.sortTitleValue
            }
		}).then((resp) => {
            console.log(resp);
            if (resp.data.status){
                success('添加成功')
            }
		}, (err) => {
			error('添加失败')
		});
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