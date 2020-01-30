import React, {Component,Fragment} from "react"
import  {Link}  from "react-router-dom";
import './header.css';
import { Row, Col } from "antd";

class Index extends Component {
    constructor(props) {
        super(props);  //调用父类的构造函数，固定写法
        this.state = {
            productShow:false
        };
    }
    render () { 
        return (
            <Fragment>
                <div className="banner"> 
                <span className='name'>HarlieYang</span>
                <div className='main'>
                <Row>
                    <Col span={3}></Col>
                    <Col span={13}>
                    
                        <div className='main-max'>
                            <span>
                                <Link to="/">深入JS</Link>
                            </span>
                            <span>
                                <Link to="/">前沿框架</Link>
                            </span>
                            <span>
                                <Link to="/">后端</Link>
                            </span>
                            <span>
                                <Link to="/">其他</Link>
                            </span>
                            </div>
                        
                    </Col>
                    <Col span={8}></Col>
                </Row>
                </div>
                </div>
            </Fragment>
        )
    }
}

export default Index;