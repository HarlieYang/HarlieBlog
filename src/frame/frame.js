import React,{Component,Fragment} from 'react'

class Home extends Component {
    constructor(props) {
        super(props);  //调用父类的构造函数，固定写法
        this.state = {
        };
    }
    render () {
        return (
            <Fragment>
                <div>
                    home
                </div>
            </Fragment>
        )
    }
}
export default Home;