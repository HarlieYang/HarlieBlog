import React, {Component,Fragment} from "react"
import {Link} from 'react-router-dom'
import axios from 'axios'
import './javascript.css';
import { Row, Col } from "antd";

class Index extends Component {
    constructor(props) {
        super(props);  //调用父类的构造函数，固定写法
        this.state = {
            productShow:false,
            titleList: []
        };
    }
    componentWillMount () {
        this.getList()
    }
    getList = () => {
        axios({
			method: 'post',
            url: "/getArticle",
            data: {
                type: 1
            }
		}).then((resp) => {
            if (resp.data.result){
                this.setState({
                    titleList: JSON.parse(resp.data.result)
                })
            }
		}, (err) => {
			console.log(err);
        });
    }
    render () { 
        console.log(this.state.titleList)
        return (
            <Fragment>
                <div className='section'>
                    <Row>
                        <Col span={3}></Col>
                        <Col span={13}>
                            <div className='list'>
                                <p>Javascript</p>
                                <ul>
                                    {
                                        this.state.titleList.map((item,index)=>{
                                            return <li key={index}>
                                                <Link to='/index/content/1'>{item.title}</Link>
                                            </li>
                                        })
                                    }
                                </ul>
                    </div>
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}

export default Index;