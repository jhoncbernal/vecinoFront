export async function HttpRequest(url:string,method:string,headers:any,data:any='') {
    let jsonheader={'Content-Type': 'application/json'}
    const objSent={
      method: method,     
      body: JSON.stringify(data),
      headers: {...jsonheader,...headers}
    }
    if(method==='GET'){
     delete objSent.body;
    }
    const result:any = async () => {
      try{
      return await fetch(url,{...objSent,...{mode:"cors"}} )
        .then(res => res.json())
        .catch(error => {return { 'ErrorMessage': 'sin conexion con el servidor '+error } })
        .then(response => {
            return  {response};            
        });}
        catch (e) {
          console.error("HttpRequest:"+e);
        }
    };
  let resultado =await result();
    return {
      resultado
    };
  }