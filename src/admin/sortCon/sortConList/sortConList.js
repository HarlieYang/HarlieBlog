import React,{Component, Fragment} from 'react'
import { PageHeader, Table, message, Button} from 'antd'
import  axios from 'axios'
const success = function (con) {
    message.success(con);
};
const error = function (con) {
    message.error(con);
}

class sortConList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            articleList: [],
            sortList: [],
            columns: [
                {
                  title: '所属技术类',
                  dataIndex: 'sort_name'
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
        axios({
			method: 'get',
			url: "/getSort"
		}).then((resp) => {
            if (resp.status === 200){
                this.setState({
                    sortList: resp.data
                })
                this.articleList()
            }
		}, (err) => {
			console.log(err);
		});
    }
    articleList () {
        axios({
			method: 'get',
			url: "/getArticle"
		}).then((resp) => {
            if (resp.status === 200){
                const data = resp.data
                data.forEach(element => {
                    const article = this.state.sortList.filter(item => {
                       return element.sort_id === item.id
                    })
                    element['sort_name'] = article[0]['sort_name']
                });
                this.setState({
                    articleList: resp.data
                })
            }
		}, (err) => {
			console.log(err);
        });
    }
    onDelete = (value) => {
        axios({
            method: 'post',
            url: "/deleteArticle",
            data: {
                id: value
            }
        }).then(resp => {
            console.log('harlie------sortdelete',resp.data)
            if(resp.data.status) {
                success('删除成功')
                this.articleList()
            } else {
                error('删除失败')
            }
        })
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
        }
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
                <Table rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.articleList} rowKey='1'/>      
            </div>
            </Fragment>
        )
    }
}
export default sortConList