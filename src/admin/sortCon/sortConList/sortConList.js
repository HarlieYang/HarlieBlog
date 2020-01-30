import React,{Component, Fragment} from 'react'
import { PageHeader, Table } from 'antd'
import  axios from 'axios'

const columns = [
    {
      title: '所属技术类',
      dataIndex: 'sort_name',
    },
    {
      title: '文章标题',
      dataIndex: 'title',
    },
    {
        title: '添加时间',
        dataIndex: 'create_time',
    },
    {
        title: '设置'
    }
  ];

class sortConList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            sortList: []
        }
    }
    componentWillMount () {
        this.getSortList()
    }
    getSortList () {
        axios({
			method: 'get',
			url: "/getArticle"
		}).then((resp) => {
            if (resp.data.result){
                console.log(resp.data.result)
                this.setState({
                    sortList: JSON.parse(resp.data.result)
                })
            }
		}, (err) => {
			console.log(err);
        });
    }
    render () {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
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
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.sortList} rowKey='1'/>      
            </div>
            </Fragment>
        )
    }
}

export default sortConList;