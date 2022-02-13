import { loginByPassword, getAccessToken, pushBandData } from "./api.js";
import { isEmpty } from "./common.js";
import * as log from "./log.js";
import Configstore from "configstore";


export async function run(username, password) {
  const store = new Configstore("sport-editor." + username, {});

  let app_token = store.get("app_token");
  let user_id = store.get("user_id");
  if ((store.get("error") || 0) > 10) {
    log.error("上传步数失败，错误次数已达上限！程序异常！");
    throw e;
  }

  if (isEmpty(app_token) || isEmpty(user_id)) {
    log.warn("未获取到APP_TOKEN或USER_ID 将使用账号密码方式运行");
    const code = await loginByPassword(username, password);
    const res = await getAccessToken(code);
    store.set("app_token", res.app_token);
    store.set("user_id", res.user_id);
  }
  const status = await pushBandData(username);
  if (status === "noLogin") {
    //登录失败
    log.warn("尝试一次重试登录！");
    await pushBandData(username);
  }
}