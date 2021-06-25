import { createStore } from 'redux'  // 引入createStore方法
import reducer from './reducer'   
import { devToolsEnhancer } from 'redux-devtools-extension'  // 调试工具

const store = createStore(reducer,devToolsEnhancer())
window._ROOT_STORE_ = store
export default store;   // 暴露出去