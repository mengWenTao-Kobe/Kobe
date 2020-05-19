/* 
  正则相关的工具函数
*/


//验证账号,  必须包含中文
export let regAcc=/(\w*[\u4e00-\u9fa5]+)+/ 

//验证密码,  字母开头，4-16字节，允许字母数字下划线组合
export let regPwd=/^[a-zA-Z]\w{3,15}$/