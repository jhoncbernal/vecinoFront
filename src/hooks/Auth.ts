import { Storages } from "./Storage";
import { User } from "../entities";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
const { setObject, removeItem, getObject } = Storages();
export const login = async (user: User, token: string) => {
  await setObject("user", user);
  await setObject("token", token);
};

export const logout = async () => {
  await removeItem("token");
  await removeItem("user");
  await removeItem("fireToken");
};

export const isLogin = async () => {
  let user = await getObject("user");
  if (user) {
    return true;
  }
  return false;
};
export const setFingerLogin = async (username: string, password: string) => {
  try {
    AndroidFingerprintAuth.isAvailable()
      .then((result) => {
        if (result.isAvailable) {
          // it is available

          AndroidFingerprintAuth.encrypt({
            clientId: "Vecinoo",
            username: username,
            password: password,
            disableBackup:true,
            token:"Vecinoo"
          })
            .then(async (result) => {
              if (result.withFingerprint) {
                await setObject("fingerToken", result.token);
              } else if (result.withBackup) {
              } else console.error("Didn't authenticate!");
            })
            .catch((error) => {
              if (
                error === AndroidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED
              ) {
              } else console.error(error);
            });
        } else {
          // fingerprint auth isn't available
        }
      })
      .catch((error) => console.error(error));
  } catch (e) {
    console.error("getFingerLogin" + JSON.stringify(e));
  }
};
export async function getFingerLogin(token: string,username: string) {
  try {
    return await new Promise<string>((resolve, reject) => {
       AndroidFingerprintAuth.isAvailable()
        .then((result) => {
          if (result.isAvailable) {
            AndroidFingerprintAuth.decrypt({
              clientId: "Vecinoo",
              username: username,
              disableBackup:true,
              userAuthRequired:true,
              dialogTitle: "Ingresa tu huella",
              dialogMessage: "Ubica tu huella en el sensor de tu celular para continuar.",
              dialogHint:'',
              token:token
            })
              .then((result) => {
                if (result.password) {
                  resolve(result.password);
                } else {
                  reject("Didn't authenticate!");
                }
              
              })
              .catch((error) => {
                if (
                  error === AndroidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED
                ) {
                  reject("Fingerprint authentication cancelled");
                } else reject(JSON.stringify(error));
              });
          } else {
            reject("fingerprint auth isn't available");
          }
        })
        .catch((error) => reject(error));
    });
  } catch (e) {
    console.error("getFingerLogin" + JSON.stringify(e));
  }
}
