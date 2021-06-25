/*
 * @Author: your name
 * @Date: 2021-06-23 10:52:04
 * @LastEditTime: 2021-06-25 14:03:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /HarlieBlog/src/view/articlelist/articlelist.js
 */
import React, {Component,Fragment} from "react"
import { Link } from 'react-router-dom'
import { Row,Pagination } from "antd";

import axios from 'axios'
import './articlelist.css';

class Article extends Component {
    constructor(props) {
        super(props);  //调用父类的构造函数，固定写法
        this.state = {
            articleCon: null,
            title: null,
            data: [1,2,3,4,5,6,7,8]   // 数据展示
        };
    }
    componentWillMount () {
        // this.getContent()
    }
    getContent = () => {
        axios({
            method: 'get',
            url: '/getArticle',
            data: {
                sort_id: 'b52d20f4-a3d6-4c61-8b12-b6cde2d63753'
            }
        }).then(resp => {
            if(resp.status === 200) {
                let result = resp.data
                this.setState({
                    articleCon: result[0]['content'],
                    title:  result[0]['title']
                })
                console.log(this.state.articleCon)
            }
        })
    }
    render () { 
        return (
            <Fragment> 
                <div className="main">
                    <Row className="">
                        {
                            this.state.data.map((item,index) => {
                                return (
                                    <article className="article" key={index}>
                                        <div className="content-title">
                                            <Link className="title-a">小程序手机号授权流程</Link>
                                        </div> 
                                        <div className="content-subtitle">
                                            <span>发表于 2020-09-09</span>
                                            <span className="cate">类目：<Link>微信小程序</Link></span>
                                        </div> 
                                        <div className="image">
                                            <img src="/assets/images/bgarticle.png" alt=""></img>
                                        </div> 
                                        <div className="more">
                                            <Link>展开</Link>
                                        </div>               
                                    </article>
                                )   
                            })
                        }
                    </Row>
                </div>
                <div className="pagination">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </Fragment>
        )
    }
}

export default Article;