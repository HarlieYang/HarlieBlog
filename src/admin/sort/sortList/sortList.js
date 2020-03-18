import React,{Component,Fragment} from 'react'
import { PageHeader, Table} from 'antd';

import axios from "axios";

import './sortList.css'
const columns = [
    {
      title: '技术名称',
      dataIndex: 'sort_name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
];

class sortList extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            sortList: [
                {
                  sort_name: 'John Brown',
                  address: 'New York No. 1 Lake Park',
                },
                {
                  sort_name: 'Jim Green',
                  address: 'London No. 1 Lake Park',
                }
            ]
        }
    }
    componentWillMount () {
        this.getSortList()
    }
    getSortList () {
        axios({
			method: 'get',
			url: "/getSort"
		}).then((resp) => {
            if (resp.data.result){
                this.setState({
                    sortList: JSON.parse(resp.data.result)
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
                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.sortList} rowKey='1'/>      
            </div>
        </Fragment>
    );
    }
}

export default sortList;