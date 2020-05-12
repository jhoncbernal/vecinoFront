import {
  Plugins,
  PushNotificationToken
} from "@capacitor/core";
import { updateToken } from "./UpdateToken";
const { PushNotifications } = Plugins;

export async function push() {
  try {
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On succcess, we should be able to receive notifications
    PushNotifications.addListener(
      "registration",
      async (token: PushNotificationToken) => {
        updateToken(token.value);
      }
    );

    // Some issue with your setup and push will not work
    PushNotifications.addListener("registrationError", (error: any) => {
      alert("Error on registration: " + JSON.stringify(error));
    });
  } catch (e) {
    console.error(e);
  }
}
