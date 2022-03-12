import { LocalNotifications } from "@ionic-native/local-notifications";
import { PhonegapLocalNotification } from "@ionic-native/phonegap-local-notification";
export function createLocalNotification(title: string,message: string){
LocalNotifications.schedule({
  id: 1,
  title: title,
  text: message,
  icon: "/assets/img/IconLogo.png",
});
PhonegapLocalNotification.requestPermission()
  .then((permission) => {
    if (permission === "granted") {
      PhonegapLocalNotification.create(title, {
        tag: title+message,
        body: message,
        icon: "/assets/img/IconLogo.png",
      });
    }
  })
  .catch((e) => console.error(e));
}