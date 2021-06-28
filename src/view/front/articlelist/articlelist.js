import React, {Component,Fragment} from "react"
import { Link } from 'react-router-dom'
import { Row } from "antd";

import {requestPost} from "@/api/request";

import './articlelist.css';

class Article extends Component {
    constructor(props) {
        super(props);  //调用父类的构造函数，固定写法
        this.state = {
            articleData: []   // 数据展示
        };
    }
    componentWillMount () {
        this.getContent()
    }
    getContent = () => {
        requestPost('getArticle','','get').then(resp => {
            if(resp.status === 200) {
                this.setState({
                    articleData: resp.data
                })
            }
        })
    }
    render () { 
        return (
            <Fragment> 
                <div className="main">
                    <Row className="">
                        {
                            this.state.articleData.map((item,index) => {
                                return (
                                    <article className="article" key={index}>
                                        <div className="content-title">
                                            <Link className="title-a">{item.title}</Link>
                                        </div> 
                                        <div className="content-subtitle">
                                            <span>发表于 {item.createdAt}</span>
                                            <span className="cate">类目：<Link>微信小程序</Link></span>
                                        </div> 
                                        <div className="image">
                                            <img src="/assets/images/bgarticle.png" alt=""></img>
                                        </div> 
                                        <div className="more">
                                            <Link to={ `/front/articledetail?id=${item.id}` }>展开</Link>
                                        </div>               
                                    </article>
                                )   
                            })
                        }
                    </Row>
                </div>
                {/* <div className="pagination">
                    <Pagination defaultCurrent={1} total={50} />
                </div> */}
            </Fragment>
        )
    }
}

export default Article;