import React, {Component,Fragment} from "react"
import  {Link}  from "react-router-dom";
import './header.css';

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
                    <div className="top">
                        <strong className='name'>
                            <Link href="http://localhost:3000/index">Harlie-Front-End</Link>
                        </strong>
                        <span className='name-title'>开发技术分享</span>
                        <span className='name-title'>新技术讨论</span>
                    </div>
                    <footer className="footer">
                        <div class="inner">
                            <ul class="icons">
                                <li>
                                    <Link target="blank" href="https://github.com/HarlieYang" alt="" class="icon fa-github" title="GitHub">
                                        <img src="/assets/images/github-fill.png" alt=""></img>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" id="translateBtn" class="icon fa-language" title="簡繁轉換" >
                                        <img src="/assets/images/mark.png" alt=""></img>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="copyright">
                            <span>© 2009 ~ 2021 </span> 
                            <Link href="http://localhost:3000/index"> Harlie-Front-End </Link>
                        </div>
                    </footer>
                </div>
            </Fragment>
        )
    }
}

export default Index;