import React,{Component,Fragment} from 'react'
import { PageHeader, Table, Button, message} from 'antd';

import {requestPost} from "@/api/request";

import './sortList.css'

class sortList extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            sortList: [],
            columns: [
                {
                  title: '技术名称',
                  dataIndex: 'sortName',
                },
                {
                    title: '技术标题',
                    dataIndex: 'sortTitle',
                },
                {
                  title: '创建时间',
                  dataIndex: 'createdAt',
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    render: (text, record) => (
                        <span>
                          <Button type="primary" onClick={this.onDelete.bind(this,record.id)}>删除</Button>
                        </span>
                      ),
                }
            ]
        }
    }
    componentWillMount () {
        this.getSortList()
    }
    
    // 删除分类
    onDelete (id) {
        requestPost('deleteSort', { id }).then(resp => {
            if(resp){
                message.success('删除成功')
                this.getSortList()
            }
        })
    }
    // 获取分类列表
    getSortList () {
        requestPost('getSort', {}, 'get').then(resp => {
            console.log('resp',resp)
            if (resp.status === 200){
                this.setState({
                    sortList: resp.data
                })
            }
        })
    }

    render() {
        return (
            <Fragment>
                <PageHeader
                    style={{
                    border: '1px solid rgb(235, 237, 240)',
                    }}
                    
                    title="技术分类列表"
                    subTitle="查看、删除分类"
                /> 
                <div className='sort-table'>
                    <Table columns={this.state.columns} dataSource={this.state.sortList} key='1'/>      
                </div>
            </Fragment>
        );
    }
}

export default sortList;