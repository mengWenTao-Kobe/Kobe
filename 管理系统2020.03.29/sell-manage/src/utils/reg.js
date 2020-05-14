/* 
  小貂蝉写的  2020/3/31
*/
// 帐号的正则（必须包含中文）
export const accReg=/[\u4E00-\u9FA5]/;

// 密码的正则（帐号是否合法(字母开头，4-13字节，字母/数字/下划线）
export const pwdReg=/^[a-zA-Z]\w{3,12}$/;

