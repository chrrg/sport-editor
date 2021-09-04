import log4js from "log4js";

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    app: { type: "file", filename: "run.log" }
  },
  categories: {
    default: { appenders: ["out", "app"], level: "debug" }
  }
});
const logger = log4js.getLogger();


const LogType = {
  INFO: "info",
  WARN: "warn",
  ERROR: "error"
};

function log(msg, type = LogType.INFO) {
  logger._log(type, msg);
  // console.log(`[${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}] [${type}] ${msg}`);
}

export const info = (msg) => log(msg, LogType.INFO);
export const warn = (msg) => log(msg, LogType.WARN);
export const error = (msg) => log(msg, LogType.ERROR);
