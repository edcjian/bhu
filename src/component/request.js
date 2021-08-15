import axios from 'axios'
const ConfigBaseURL = 'http://111.229.235.215:3000/'
const request =axios.create({
    baseURL: ConfigBaseURL,
    // proxy: {
    //     host: '127.0.0.1',
    //     port: 10809
    // }
})
request.interceptors.request.use(config => {
//let sd= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcnQiLCJpYXQiOjE2MDk4NTYwMzcsImV4cCI6MTYwOTg1NjM5N30.jToQXx6ns_1B4PPlbLGEmVGLIabBt-9_Ypdc4bBtB9U'
 //   window.localStorage.setItem("token",sd)
    //

//
    config.headers.authorization =window.localStorage.getItem("token")


     //   config.headers.authorization =`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcnQiLCJpYXQiOjE2MDk4NTYwMzcsImV4cCI6MTYwOTg1NjM5N30.jToQXx6ns_1B4PPlbLGEmVGLIabBt-9_Ypdc4bBtB9U`
    return config;
})
request.interceptors.response.use(config => {
  //  
 window.localStorage.setItem("token",config.data.token)
        return config.data;
    }
)
export default request
