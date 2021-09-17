import { run } from "./src/main.js";
import * as log from "./src/log.js";
import Configstore from "configstore";
import dayjs from "dayjs";

(async function() {
  const args = process.argv.splice(2);
  const config = {
    username: args[0],//你的账号
    password: args[1],//你的密码
    // stepPerHour: args[2]//步数 每小时平均走1000步 就是有可能走0-2000
  };
  if (!config.username) {
    console.log("请填写账号！");
    return;
  }
  if (!config.password) {
    console.log("请填写密码！");
    return;
  }
  // if (!config.stepPerHour)
  //   config.stepPerHour = 1000;
  // if (isNaN(config.stepPerHour)) {
  //   console.log("步数填写不正确！");
  //   return;
  // }
  const hour = new Date().getHours();
  let addStep = 0;//(Math.random() * config.stepPerHour * 2) | 0;//增加多少步


  if (hour < 8) {//8点之前不执行
    console.log("8点之前不执行脚本！");
    return;
  }else if(hour<=11){//8 9 10 11 最少6000 平均8000
    addStep+=1500+Math.random()*500;
  }else if(hour<=15){//12 13 14 15
    addStep+=500+Math.random()*200;//最少8000 平均10400
  }else if(hour<=19){//16 17 18 19
    addStep+=250+Math.random()*100;//最少9000 平均11800
  }else if(hour<=23){//20 21 22 23
    addStep+=50+Math.random()*50;//最少9200 平均12100
  }else if(hour > 23){
    console.log("23点之后不执行脚本！");
    return;
  }else{
    console.log("error");
    return;
  }


  const store = new Configstore("sport-editor." + config.username, {});
  const date = dayjs().format("YYYY-MM-DD");
  const prevStep = store.get(date) | 0;

  let step = prevStep + addStep;
  if (step < 0) step = 1;

  store.set(date, step);
  log.info("程序启动！本次步数设置为：" + step);

  await run(config.username, config.password);
})();