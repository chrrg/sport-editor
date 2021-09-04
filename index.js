import { run } from "./src/main.js";
import * as log from "./src/log.js";
import Configstore from "configstore";
import dayjs from "dayjs";

(async function() {
  const args = process.argv.splice(2);
  const config = {
    username: args[0],//你的账号
    password: args[1],//你的密码
    stepPerHour: args[2]//步数 每小时平均走1000步 就是有可能走0-2000
  };
  if (!config.username) {
    console.log("请填写账号！");
    return;
  }
  if (!config.password) {
    console.log("请填写密码！");
    return;
  }
  if (!config.stepPerHour)
    config.stepPerHour = 1000;
  if (isNaN(config.stepPerHour)) {
    console.log("步数填写不正确！");
    return;
  }
  const hour = new Date().getHours() - 8;
  if (hour < 0) {
    console.log("8点之前不执行脚本！");
    return;
  }//8点之前不执行
  const store = new Configstore("sport-editor." + config.username, {});
  const date = dayjs().format("YYYY-MM-DD");
  const prevStep = store.get(date) | 0;
  const addStep = (Math.random() * config.stepPerHour * 2) | 0;//增加多少步
  let step = prevStep + addStep;
  if (step < 0) step = 1;

  store.set(date, step);
  log.info("程序启动！本次步数设置为：" + step);

  await run(config.username, config.password);
})();