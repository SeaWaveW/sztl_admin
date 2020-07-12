//引入：  import {regMobile} from 'tools/regExp.js';
/*
使用1：  validator:(rule, value, callback)=>{
        regMobile(rule, value, callback)
      }
使用2： validator:regMobile
*/

//手机号正则  
export const regMobile = (rule, value, callback) => {
    const reg = RegExp(/^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/)
    if(!reg.test(value)){ return callback(rule) }//不通过
    callback() //通过
}

//只能以 ， 号隔开
export const regNumberComma = (rule, value, callback) => {
  const reg = RegExp(/^[\d]{0,1}|[\d]{1}[,]{1}|[\d]{1}[,]{1}[\d]{1}$/)
  if(!reg.test(value)){ return callback(rule) }//不通过
  callback() //通过
}

//验证 数字
export const regNumber = (rule, value, callback) => {
  const reg = RegExp(/^[0-9]+$/)
  if(!reg.test(value)){ return callback(rule) }//不通过
  callback() //通过
}

//验证 重量KG
export const regNumberEnglish = (rule, value, callback) => {
  const reg = RegExp(/^[\d]+[k]{1}[g]{1}|([\d]+[.]{1}[\d]+[k]{1}[g]{1}){1}$/ig)
  if(!reg.test(value)){ return callback(rule) }//不通过
  callback() //通过
}