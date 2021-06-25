import React,{Component,Fragment} from 'react'
import { PageHeader, Input, Row, Col, Button, Select, message, Upload, Icon} from 'antd';

import TencentOSS from '../../../api/uploadOss'

import axios from "axios";
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'

// 引入编辑器样式
import 'braft-editor/dist/index.css'
import './articleAdd.css';

const {Option} = Select

const success = function (con) {
    message.success(con);
};
const error = function (con) {
    message.error(con);
};

class sortConAdd extends Component {
    constructor(prop) {
        super(prop)
        /**
         * @description: 
         * @param {*}  sortList       类目列表
         * @param {*}  titleValue     文章title
         * @param {*}  sortId         所选类目
         * @param {*}  editorState     编辑器内容
         * @param {*}  extendControls  编辑器属性
         * @return {*}
         */    

        this.state = {
            sortList: [],
            titleValue: null,
            sortId: null,
            editorState: BraftEditor.createEditorState('Hello World!'),
            extendControls: [
                {
                  key: 'antd-uploader',
                  type: 'component',
                  component: (
                    <Upload
                      accept="image/*"
                      showUploadList={false}
                      customRequest={this.insertMediItem}
                    >
                      <button type="button" className="control-item button upload-button" data-title="插入图片">
                        <Icon type="picture" theme="filled" />
                      </button>
                    </Upload>
                  )
                }
            ]
        }
    }

    componentDidMount () {
        this.getSort()
    }

    // 获取类目列表
    getSort = () => {
        axios({
			method: 'get',
			url: "/getSort"
		}).then((resp) => {
            if (resp.status === 200){
                this.setState({
                    sortList: resp.data
                })
            }
		}, (err) => {
			console.log(err);
		});
    }

    // 编辑器上传图片功能
    insertMediItem = (value) => {
        message.loading('上传中..').then( async () => {
            const fileTencentOSS = new TencentOSS()
            fileTencentOSS.getCos()
            const url = await fileTencentOSS.upload_file_locality(value.file)
            if(url){
                message.success('上传成功')
                console.log('url',url)
                const editorState = ContentUtils.insertMedias( this.state.editorState, [
                    {
                        type: 'IMAGE',
                        url
                    }
                ])
                this.setState({
                    editorState
                })
            }
        })
    }

    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    submitContent = async () => {
        
    }
    // 编辑器change事件
    handleEditorChange = (editorState) => {
        this.setState({ editorState: editorState})
    }

    // 添加文章
    addArticle () {
        if (!this.state.sortId) return false
        axios({
			method: 'post',
            url: "/addArticle",
            data: {
                sort_id: this.state.sortId,
                title: this.state.titleValue,
                content: this.state.editorState.toHTML()
            }
		}).then((resp) => {
            if (resp.data.status){
                success('添加成功')
            }
		}, (err) => {
			error('添加失败')
		});
    }
    // 获取类目
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
                            <Input placeholder="输入标题" ref = {(value) => { this.titleValue = value}}/>
                        </Col>
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
                    </Row>
                    
                </div>
            </Fragment>
        );
    }
}

export default sortConAdd;