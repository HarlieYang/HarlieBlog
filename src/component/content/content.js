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
        console.log(this.props.match.params)
        this.getContent()
    }
    getContent = () => {
        axios({
            method: 'post',
            url: '/getArticle',
            data: {
                type: 1
            }
        }).then(resp => {
            if(resp.data.result) {
                let result = JSON.parse(resp.data.result)
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