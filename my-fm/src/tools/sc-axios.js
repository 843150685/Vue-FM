import axios from "axios";
import QS from "qs";

//设置超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
//请求携带cookie
axios.defaults.withCredentials = true;
//配置接口地址http://yiapi.xinli001.com  /api
axios.defaults.baseURL = 'http://yiapi.xinli001.com'; 
//导出请求的方法
export default function scaxios(method, url, params) {
  if (method.toUpperCase() === "GET") {
    return get(url, params);
  } else if (method.toUpperCase() === "POST") {
    return post(url, params);
  }
}

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

//请求的拦截
axios.interceptors.request.use(
  request => {
    //console.log("请求", request)
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

//响应的拦截
axios.interceptors.response.use(
  response => {
    //console.log("响应",response);
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
