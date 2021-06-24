import React,{Component,Fragment} from 'react'
import { PageHeader, Input, Row, Col, Button, Select, message} from 'antd';

import axios from "axios";
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
// 引入编辑器样式
import 'ContentUtils';
import 'braft-editor/dist/index.css'
import './articleAdd.css';
const {Option} = Select
// 创建编辑器

// const controls = ['bold', 'italic', 'underline', 'separator', 'link', 'separator', 'media']

const success = function (con) {
    message.success(con);
};
const error = function (con) {
    message.error(con);
};

class sortConAdd extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            sortList: [],
            titleValue: null,
            sortId: null,
            editorState: BraftEditor.createEditorState(null),
            extendControls: [
                'separator',
                {
                  key: 'insert-media',
                  type: 'button',
                  text: '插入图片到编辑器---',
                  onClick: this.insertMediItem.bind(this)
                }
              ]
        }
    }
    componentWillUpdate (){

    }
    async componentDidMount () {
        this.getSort()
        // 假设此处从服务端获取html格式的编辑器内容
        const htmlContent = 'Hello World!'
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        this.setState({
            editorState: BraftEditor.createEditorState(htmlContent)
        })
    }
    getSort = () => {
        axios({
			method: 'get',
			url: "/getSort"
		}).then((resp) => {
            console.log('harlie------sortlist',resp.data)
            if (resp.status === 200){
                this.setState({
                    sortList: resp.data
                })
            }
		}, (err) => {
			console.log(err);
		});
    }
    insertMediItem = () => {
        // 使用ContentUtils.insertMedias来插入媒体到editorState
        console.log('editorState',this.state.editorState)
        let editorState = this.state.editorState
        editorState = ContentUtils.insertMedias(editorState, [
          {
            type: 'IMAGE',
            url: 'https://pic4.zhimg.com/v2-4e43f6130697f7922d02ffe3192ee148_1440w.jpg?source=172ae18b'
          }
        ])
        // console.log(editorState)
        // 更新插入媒体后的editorState
        // this.setState({ editorState })
    
    }
    submitContent = async () => {
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        // const htmlContent = this.state.editorState.toHTML()
        // console.log('htmlContent',htmlContent)
        // const result = await saveEditorContent(htmlContent)
    }

    handleEditorChange = (editorState) => {
        console.log(' editorState.toHTML()', editorState.toHTML())
        this.setState({ editorState: editorState.toHTML()})
    }
    addSortCon () {
        if (!this.state.sortId) return false
        console.log('this.state.editorState.toHTML()',this.state.editorState.toHTML())
        axios({
			method: 'post',
            url: "/addArticle",
            data: {
                sort_id: this.state.sortId,
                title: this.state.titleValue,
                content: this.state.editorState.toHTML()
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
    titleChange (e) {
        this.setState({
            titleValue: e.target.value
        })
    }
    onChange (value) {
        this.setState({
            sortId: value
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
                            {
                                this.state.sortList.map(item => {
                                    return(
                                        <Option value={item.id}>{item.sort_name}</Option>
                                    )
                                })
                            }
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
                                    extendControls={this.state.extendControls}
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

export default sortConAdd;