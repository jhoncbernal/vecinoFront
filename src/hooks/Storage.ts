import { Storage } from '@capacitor/core';
export  function Storages() {

    const setObject:any = async (key:string,obj:any='') => {
      try{
        await Storage.set({
            key: key,
            value: JSON.stringify({
              obj
            })
          });
      }
        catch (e) {
          console.error("setObject:"+e);
        }
    };
    const getObject:any = async (key:string) => {
        try{
            const ret = await Storage.get({ key: key });
        const user = JSON.parse(ret.value);
        return user;
        }
          catch (e) {
            console.error("getObject:"+e);
          }
      };
      const removeItem:any = async (key:string) => {
        try{
            await Storage.remove({ key: key });
        }
          catch (e) {
            console.error("getObject:"+e);
          }
      };
    return {
        setObject,
        getObject,
        removeItem
    };
  }