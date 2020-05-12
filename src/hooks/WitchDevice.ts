import { Plugins } from "@capacitor/core";

const { Device } = Plugins;
export async function witchDevice(){
const device = await Device.getInfo();
return device.operatingSystem
}