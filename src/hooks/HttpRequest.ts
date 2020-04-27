import config from "../config";
import { Storages } from "./Storage";
import Axios from "axios";
import { ErroDictionary } from "./HandleHttpErrors";

export async function HttpRequest(
  pathUrl: string,
  method: any,
  data: any = "",
  authorization: boolean = false,
  headers: any = ""
) {
  let jsonheader = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  if (authorization) {
    const { getObject } = await Storages();
    const token: any = await getObject("token");
    if (!token) {
      const err = new Error();
      err.message = "sus credenciales vencieron";
      throw err;
    } else {
      jsonheader = { ...{ Authorization: token.obj }, ...jsonheader };
    }
  }

  let url = `${config.BASE_URL}${config.API_VERSION}${pathUrl}`;

  const options = {
    url: url,
    method: method,
    headers: { ...jsonheader, ...headers },
    data: JSON.stringify(data),
  };
  if (method === "GET") {
    delete options.data;
  }
  const result: any = async () => {
    try {
      return await Axios(options)
        .then((response: any) => {
          if (response.status === 200) {
            return response.data;
          } else {
            const err = new Error();
            err.message =
              "sin conexion con el servidor " + response.ErrorMessage;
            throw err;
          }
        })
        .catch(async (error: any) => {
          // Error 😨
          let errorMessage;
          if (error.response) {
            /*
             * The request was made and the server responded with a
             * status code that falls out of the range of 2xx
             */

            if (error.response.data.message) {
              errorMessage = error.response.data.message;
            } else {
              errorMessage = error.Error;
            }
            if(errorMessage){
            if(errorMessage.includes('token')){
              const { removeItem } = Storages();
                  await removeItem('token');
                  await removeItem('user');
                  await removeItem('fireToken');
            }
            let EspError=ErroDictionary().Errors;
            const err = new Error();
            err.message = EspError.get(errorMessage)?EspError.get(errorMessage):errorMessage;
            throw err;
          }
          else{
            const err = new Error();
            err.message = 'Error con el servidor '+error.response.data?error.response.data:'';
            throw err;
          }
          } else if (error.request) {
            /*
             * The request was made but no response was received, `error.request`
             * is an instance of XMLHttpRequest in the browser and an instance
             * of http.ClientRequest in Node.js
             */
            console.error(error.request);
          } else {
            // Something happened in setting up the request and triggered an Error
            console.error("Error", error.message);
          }
          console.error(error);
          throw error;
        });
    } catch (err) {
      throw err;
    }
  };
  return await result();
}
