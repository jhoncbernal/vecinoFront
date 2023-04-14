import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);


/**
 * Converts a UTC time to the local timezone
 * @param utcTimeString UTC time string
 * @param tz Local timezone
 * @returns Local time string
 * @example timeConvertTZ("2020-10-10T00:00:00.000Z", "America/Bogota")
 */
export function timeConvertTZ(utcTimeString: string, tz: string): string {
  try {
    const utcTime = dayjs.utc(utcTimeString);
    const colombianTime = utcTime.tz(tz);
    return colombianTime.format("YY-MM-DD HH:mm:ss");
  } catch (e) {
    return utcTimeString;
  }
}

