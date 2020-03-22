import React, {Component,Fragment} from "react"
import './content.css';
import { Row, Col } from "antd";
import axios from 'axios'

class Index extends Component {
    constructor(props) {
        super(props);  //调用父类的构造函数，固定写法
        this.state = {
            articleCon: null,
            title: null
        };
    }
    componentWillMount () {
        this.getContent()
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
                <Row>
                    <Col span={3}></Col>
                    <Col span={18}>
                        <p className='article-title'>
                            {this.state.title}
                        </p>
                        <div className='content-main' dangerouslySetInnerHTML={{__html: this.state.articleCon}}>
                        </div>
                    </Col>
                    <Col span={3}></Col>
                </Row>
            </Fragment>
        )
    }
}

export default Index;