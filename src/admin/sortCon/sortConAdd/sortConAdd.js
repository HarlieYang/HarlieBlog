import React,{Component,Fragment} from 'react'
import { PageHeader, Input, Row, Col, Button, Select,} from 'antd';

import axios from "axios";
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './sortConAdd.css';
const {Option} = Select
// 创建编辑器


class sortConAdd extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            titleValue: null,
            sortValue: null,
            editorState: BraftEditor.createEditorState(null)
        }
    }
    componentWillUpdate (){

    }
    async componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        const htmlContent = 'Hello World!'
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        this.setState({
            editorState: BraftEditor.createEditorState(htmlContent)
        })
    }

    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        // const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState: editorState.toHTML()})
    }
    addSortCon () {
        console.log(this.state.sortValue)
        console.log(this.state.titleValue)
        console.log(this.state.editorState)
        if (!this.state.sortValue) return false
        axios({
			method: 'post',
            url: "/addSortCon",
            data: {
                type: this.state.sortValue,
                title: this.state.titleValue,
                content: this.state.editorState
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
    titleChange (e) {
        this.setState({
            titleValue: e.target.value
        })
    }
    onChange (value) {
        console.log(value)
        this.setState({
            sortValue: value
        })
    }
    render() {
        return (
            <Fragment>
                <PageHeader
                    style={{
                    border: '1px solid rgb(235, 237, 240)',
                    }}
                    
                    title="添加文章"
                    subTitle=""
                /> 
                <div className='sort-table'>
                    <Row>
                        <Col span={3}>
                            <span className='label-sort-name'>所属类别：</span>
                        </Col>
                        <Col span={11}>
                        <Select
                            showSearch
                            style={{width: '100%'}}
                            placeholder="选择所属类别"
                            optionFilterProp="children"
                            onChange={(e) => this.onChange(e)}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                        >
                            <Option value="1">深入JS</Option>
                            <Option value="2">前沿框架</Option>
                            <Option value="3">后端</Option>
                            <Option value="4">其他</Option>
                        </Select>
                        </Col>
                        <Col span={10}></Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                        <Col span={3}>
                            <span className='label-sort-name'>文章标题：</span>
                        </Col>
                        <Col span={11}>
                            <Input placeholder="输入标题" onChange={this.titleChange.bind(this)} defaultValue={this.state.titleValue}/>
                        </Col>
                        <Col span={10}></Col>
                    </Row>
                    <Row style={{marginTop: 20}}>
                        <Col span={3}>
                            <span className='label-sort-name'>文章内容：</span>
                        </Col>
                        <Col span={20}>
                            <div className="my-component">
                                <BraftEditor
                                    value={this.state.editorState}
                                    onChange={(e) => this.handleEditorChange(e)}
                                    onSave={this.submitContent}
                                />
                            </div>
                        </Col>
                        <Col span={1}></Col>
                    </Row>
                    <Row>
                        <Col span={12}></Col>
                        <Col span={4}>
                            <div className='submit-btn'>
                                <Button type="primary" htmlType="submit" onClick={this.addSortCon.bind(this)}>
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

export default sortConAdd;