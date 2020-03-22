import React,{Component,Fragment} from 'react'
import { PageHeader, Table, Button, message} from 'antd';

import axios from "axios";

import './sortList.css'

const success = function (con) {
    message.success(con);
};
const error = function (con) {
    message.error(con);
};
class sortList extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            sortList: [],
            columns: [
                {
                  title: '技术名称',
                  dataIndex: 'sort_name',
                },
                {
                    title: '技术标题',
                    dataIndex: 'sort_title',
                },
                {
                  title: '创建时间',
                  dataIndex: 'create_time',
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
        console.log(11111)
        this.getSortList()
    }
    onDelete (value) {
        axios({
            method: 'post',
            url: "/deleteSort",
            data: {
                id: value
            }
        }).then(resp => {
            console.log('harlie------sortdelete',resp.data)
            if(resp.data.status) {
                success('删除成功')
                this.getSortList()
            } else {
                error('删除失败')
            }
        })
    }
    getSortList () {
        axios({
			method: 'get',
			url: "/getSort"
		}).then((resp) => {
            console.log('harlie------sortlist',resp.data)
            if (resp.status == 200){
                this.setState({
                    sortList: resp.data
                })
            }
		}, (err) => {
			console.log(err);
		});
    }
    render() {
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', //Column configuration not to be checked
            name: record.name,
        }),
    };
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
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.sortList} key='1'/>      
            </div>
        </Fragment>
    );
    }
}

export default sortList;