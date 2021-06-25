/*
 * @Author: 腾讯oss上传文件
 * @Date: 2020-12-14 17:47:44
 * @LastEditTime: 2021-06-24 15:06:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xdiotmap\src\api\uploadOss.js
 */
const COS = require('cos-js-sdk-v5');
const config = {
    SecretId: 'AKIDOVbQyGQyS0LPhm5QO6Zlg7KTQF0UkdZH',
    SecretKey: 'YrumSv9b2e0A7qgGelfLj38wVqARUGsE',
    Bucket: 'mapstatic-1303072366', // 存储桶
    Region: 'ap-shanghai'  //所在域
}

class TencentOSS{
    constructor(){
        this.temp_url = ""
        this.cos = null
    }
    
    /**
     * @description: 获取cos
     * @param {*}
     * @return {*}
     */
    getCos(){
        this.cos = new COS({
            SecretId: config.SecretId,
            SecretKey: config.SecretKey,
            Method: 'post',
            Expires: 900,
        });
    }

    /**
     * @description: 校验单个文件名称是否已经存在桶中
     * @param {*} oss_file_path
     * @return {*}
     */
    check_file(oss_file_path){
    //     let response = this.cos.list_objects(
    //         Bucket:config.Bucket,
    //         Prefix:oss_file_path
    //     )
    //     let content = response.get('Contents')
    //     if (content) return true
    //     return false
    }
    
    /**
     * @description: 本地文件上传
     * @param {*} file_pth  本地文件的路径
     * @return {*} file_name 文件的名称
     */    
    upload_file_locality(fileObject){
        console.log('fileObject',fileObject)
        return new Promise((resolve,reject)=>{
            this.cos.putObject({
                Bucket: config.Bucket, /* 必须 */
                Region: config.Region,     /* 存储桶所在地域，必须字段 */
                Key: `images/${fileObject.name}`,              /* 必须 */
                StorageClass: 'STANDARD',
                Body: fileObject, // 上传文件对象
                onProgress: function(progressData) {
                }
            }, (err, data) => {
                if(data.statusCode && data.statusCode === 200) {
                    resolve(`http://mapstatic-1303072366.cos.ap-shanghai.myqcloud.com/images/${fileObject.name}`)
                } else {
                    reject()
                }
            });
        })
    }
}
export default TencentOSS;