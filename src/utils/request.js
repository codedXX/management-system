import axios from 'axios';

axios.defaults.baseURL='/api';
axios.defaults.timeout=10000;

 export default function request(url,type='GET',data={}){
  return new Promise((resolve,reject)=>{
    let options={
      method:type,
      url:url,
      validateStatus(status){
        return (status>=200 && status <=300) || status===400
      }
    }
    if(type.toLowerCase()==='get'){
      options.params=data
    }else{
      options.data=data
    }

    axios(options)
      .then(res=>{
        if(res.status== 200)
        {
          resolve(res.data)
        }else{
          reject(res.data)
        }
      }).catch(err=>{
      console.log({msg:'网络异常'},err)
    })
  })
}
