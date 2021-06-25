/*
 * @Author: your name
 * @Date: 2021-06-25 11:36:00
 * @LastEditTime: 2021-06-25 11:36:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /HarlieBlog/src/utils/utils.js
 */
const success = function (con) {
    message.success(con);
};
const error = function (con) {
    message.error(con);
};

export default {
    success,
    error
}