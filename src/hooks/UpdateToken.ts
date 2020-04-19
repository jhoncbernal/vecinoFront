import { Storages } from "./Storage";
import config from "../config";
import { HttpRequest } from "./HttpRequest";

export async function updateToken(fireToken: string) {
  try {
    const { setObject, getObject, removeItem } = Storages();
    await setObject("fireToken", fireToken);
    const user: any = await getObject("user");
    let pathUrl = `${config.UserContext}/${user.obj._id}`;
    let data = { fireToken: fireToken };
    await HttpRequest(pathUrl, "PATCH", data)
      .then(async (resultado: any) => {
        return resultado;
      })
      .catch(async (error) => {
        await removeItem("token");
        await removeItem("user");
        await removeItem("fireToken");
        throw error;
      });
  } catch (e) {
    console.error("UpdateToken: ", e);
  }
}
