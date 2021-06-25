
import React, {Component,Fragment} from "react"
import { Link } from 'react-router-dom'
import { Row } from "antd";

import {requestPost} from "@/api/request";

import './articledetail.css';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);  //调用父类的构造函数，固定写法
        this.state = {
            articleDetail: null  // 数据展示
        };
    }
    componentWillMount (props) {
        console.log('props',window.location.search)
        const id = window.location.search.split('=')[1]
        this.getContent(id)
    }
    getContent = (id) => {
        requestPost('getArticle',{ params: {id} },'get').then(resp => {
            if(resp.status === 200) {
                this.setState({
                    articleData: resp.data[0]
                })
            }
        })
    }
    back = () => {
        console.log('window',this.props)
       this.props.history.goBack()
    }
    render () { 
        return (
            <Fragment> 
                <div className="main">
                    {
                        this.state.articleData ? (
                            <Fragment>
                                <p onClick={this.back.bind(this)} className="back">返回</p>
                                <p className="headline">{this.state.articleData.title}</p>
                                <p className="time">程序员Harlie {this.state.articleData.updatedAt}</p>
                                {/* 内容 */}
                                <div dangerouslySetInnerHTML={{__html:this.state.articleData.content}}>
                                </div>
                            </Fragment>
                        ): ''
                    }
                </div>
            </Fragment>
        )
    }
}

export default ArticleDetail;