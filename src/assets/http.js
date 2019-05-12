import axios from 'axios'
import Qs from 'qs'

//创建axios实例
var service = axios.create({
  baseURL: 'http://192.168.13.1:9032/',
  timeout: 5000,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    // "Authorization": 'Bearer '+(localStorage.getItem('auth')).access_token
  }
});

var formService= axios.create({
  baseURL: 'http://192.168.13.1:9032/',
  timeout: 5000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    "Content-Type" : "application/x-www-form-urlencoded",
    // "Authorization": 'Basic '+localStorage.getItem('token')
  }
});
// axios.interceptors.request.use(function (config) {
//   var token =localStorage.getItem('token');
//   if (token) {
//     config.headers["Authorization"] = "Bearer " + token;
//   }
//
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });
//service.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

// service.interceptors.request.use(
//   (config)=>{
//     config.headers.Authorization  ='Bearer ' + localStorage.getItem('token')
//     return config;
//   }
// )
export default {
  //get请求，其他类型请求复制粘贴，修改method
  postJson(url, param) {
    return new Promise((cback, reject) => {

      service({
        method: 'post',
        url,
        data:  param,
        // auth: {
        //   username: 'air_client',
        //   password: 'air_client'
        // },
        headers: {
          "Authorization": 'Bearer '+(JSON.parse(localStorage.getItem('auth'))).access_token
        }
      }).then(res => {
        //axios返回的是一个promise对象
        var res_code = res.status.toString();
        if (res_code.charAt(0) == 2) {
          cback(res);   //cback在promise执行器内部
        } else {
          console.log(res, '异常1')
        }
      }).catch(err => {
        if (!err.response) {
          console.log('请求错误')
          //Message是element库的组件，可以去掉

        } else {
          reject(err.response);
          console.log(err.response, '异常2')
        }
      })

    })
  }
  ,get(url, param) {
    return new Promise((cback, reject) => {

      service({
        method: 'get',
        url,
        params:  param,
        // auth: {
        //   username: 'air_client',
        //   password: 'air_client'
        // },
        headers: {
          "Authorization": 'Bearer '+(JSON.parse(localStorage.getItem('auth'))).access_token
        }
      }).then(res => {
        //axios返回的是一个promise对象
        var res_code = res.status.toString();
        if (res_code.charAt(0) == 2) {
          cback(res);   //cback在promise执行器内部
        } else {
          console.log(res, '异常1')
        }
      }).catch(err => {
        if (!err.response) {
          console.log('请求错误')
          //Message是element库的组件，可以去掉

        } else {
          reject(err.response);
          console.log(err.response, '异常2')
        }
      })

    })
  }
  ,postk(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.data)
        })
    });
  }
  ,postForm(url, params){
    return new Promise((cback, reject) => {

      formService({
        method: 'post',
        url,
        data:  Qs.stringify(params),
        auth: {
          username: 'air_client',
          password: 'air_client'
        },
      }).then(res => {
        //axios返回的是一个promise对象
        var res_code = res.status.toString();
        if (res_code.charAt(0) == 2) {
          cback(res);   //cback在promise执行器内部
        } else {
          console.log(res, '异常1')
        }
      }).catch(err => {
        if (!err.response) {
          console.log('请求错误')
          //Message是element库的组件，可以去掉

        } else {
          reject(err.response);
          console.log(err.response, '异常2')
        }
      })

    })
  }
}
