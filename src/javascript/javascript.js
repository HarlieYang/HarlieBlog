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
			method: 'get',
            url: "/getArticle",
            data: {
                sort_id: 'b52d20f4-a3d6-4c61-8b12-b6cde2d63753'
            }
		}).then((resp) => {
            console.log(resp)
            if (resp.status === 200){
                this.setState({
                    titleList: resp.data
                })
            }
		}, (err) => {
			console.log(err);
        });
    }
    render () { 
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
                                                <Link to={`/index/content/${item.id}`}>{item.title}</Link>
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