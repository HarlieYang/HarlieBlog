import React,{Component,Fragment} from 'react'
import { PageHeader, Input, Row, Col, Button} from 'antd';

import axios from "axios";

import './sortAdd.css';

class sortAdd extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            inputValue: null
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
                sort_name: this.state.inputValue
            }
		}).then((resp) => {
            console.log(resp);
            if (resp.data.result){
                this.setState({
                    sortList: JSON.parse(resp.data.result)
                })
            }
		}, (err) => {
			console.log(err);
		});
    }
    inputChange () {
        const inputValue = this.refs.sortValue.state.value
        this.setState({
            inputValue: inputValue
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
                    <Row>
                        <Col span={3}>
                            <span className='label-sort-name'>类别名称：</span>
                        </Col>
                        <Col span={11}>
                            <Input placeholder="Basic usage" ref='sortValue' onChange={() => this.inputChange()}/>
                        </Col>
                        <Col span={10}></Col>
                    </Row>
                    <Row>
                        <Col span={12}></Col>
                        <Col span={4}>
                            <div className='submit-btn'>
                                <Button type="primary" htmlType="submit" onClick={this.addSort.bind(this)}>
                                    Submit
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