import { BASEURL, APIVERSION } from "../config";
import { Storages } from "./Storage";
import Axios from "axios";

export async function HttpRequest(pathurl:string,method:any,data:any='',authorization:boolean=false,headers:any='') {
  let jsonheader={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*',}
  if(authorization){
  const { getObject } = await Storages();
  const token: any = await getObject('token');
      if (!token) {
        const err = new Error();
        err.message = 'sus credenciales vencieron';
        throw err;
      }
      else{
        jsonheader= {...{'Authorization': token.obj},...jsonheader}
      }
    }
    
    let url = `${BASEURL}${APIVERSION}${pathurl}`;

    const options = {
      url: url,
      method: method,
      headers: {...jsonheader,...headers},
      data: JSON.stringify(data),
    };
    if(method==='GET'){
      delete options.data;
     }
    const result:any = async () => {
      try{
          return await Axios(options)        
          .then((response: any) => {
                        if (response.status === 200) {
                          return response.data;
                        }  
                        else{
                            const err = new Error();
                            err.message = 'sin conexion con el servidor ' + response.ErrorMessage;
                            throw err;
                        }                        
          })
          .catch(err => {throw err});
         }catch(err){ throw err;}
    }
      return await result();
  }
