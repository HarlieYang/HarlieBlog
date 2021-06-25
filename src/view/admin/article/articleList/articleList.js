import React,{Component, Fragment} from 'react'
import { PageHeader, Table, message, Button} from 'antd'

import { requestPost } from "@/api/request";

class sortConList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            articleList: [],
            sortList: [],
            columns: [
                {
                  title: '所属技术类',
                  dataIndex: 'sortName'
                },
                {
                  title: '文章标题',
                  dataIndex: 'title',
                },
                {
                    title: '添加时间',
                    dataIndex: 'createAt',
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    render: (text, record) => (
                        <span>
                          <Button type="primary" onClick={this.onDelete.bind(this,record.id)}>删除</Button>
                        </span>
                      ),
                },
              ]
        }
    }
    componentWillMount () {
        this.getSortList()
    }
    getSortList () {
        requestPost('getSort','','get').then(resp => {
            if( resp.status === 200 ){
                this.setState({
                    sortList: resp.data
                })
                this.articleList()
            }
        })
    }
    articleList () {
        requestPost('getArticle','','get').then(resp => {
            if (resp.status === 200){
                const data = resp.data
                data.forEach(element => {
                    const article = this.state.sortList.filter(item => {
                       return element.sortId === item.id
                    })
                    element['sortName'] = article[0]['sortName']
                });
                this.setState({
                    articleList: resp.data
                })
            }
        })
    }

    onDelete = (value) => {
        requestPost('deleteArticle',{id : value}).then(resp => {
            if(resp.status) {
                message.success('删除成功')
                this.articleList()
            } else {
                message.error('删除失败')
            }
        })
    }
    render () {
        return (
            <Fragment>
                <PageHeader
                style={{
                border: '1px solid rgb(235, 237, 240)',
                }}
                
                title="技术文章列表"
                subTitle="查看、删除文章"
            /> 
            <div className='sort-table'>
                <Table columns={this.state.columns} dataSource={this.state.articleList} rowKey='1'/>      
            </div>
            </Fragment>
        )
    }
}
export default sortConList