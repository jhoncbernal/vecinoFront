import { Storages } from "./Storage";
import { User } from "../entities";

const { setObject, removeItem,getObject } = Storages();
export const login = async(user:User,token:string) => {

    await setObject("user", user);
    await setObject("token", token);
}

export const logout = async() => {
    await removeItem("token");
    await removeItem("user");
    await removeItem("fireToken");
}

export const isLogin = async () => {
   let user= await getObject("user")
    if (user) {
        return true;
    }
    return false;
}