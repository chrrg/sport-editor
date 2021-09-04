# 运动步数修改工具

修改步数，数据可立即同步到各大平台（微 信、支 付 宝、Q Q 运 动）

支持登录态缓存、支持多账户

# 命令行运行

```
git clone https://github.com/Devifish/sport-editor.git
cd sport-editor
npm install
npm run start phone password step
```

其中`phone`应该填写为你的11位的手机号码

`password`填写你的密码

`step`填写每小时跑的步数 建议设置为`1000`

定时器的搭配每小时可随机新增step值

一天结束后大约可以得到 `16*step` 步数。

程序每个小时的增量为随机在`0 ~ step * 2`的范围下

所以step填1000时，一天的步数大约是16000（8点开始有步数）

step如果设置太大，步数不会生效！

# 添加定时任务

cmd打开compmgmt.msc`任务计划程序库`中新增定时器

## 触发器 每隔一小时执行一次脚本

配置为：`每天`每隔`1天`发生一次

任务最多延迟时间（随机延迟）：`30分钟`

重复任务间隔：`1小时`  持续时间：`1天`

已启用

确定即可

## 操作

启动程序

程序或脚本`npm`

添加参数：`run start [phone] [password] [step]`

起始于：`C:\github\chrrg\sport-editor`(项目根目录)


## 其它系统

定时器作为触发器执行一次步数上传任务。

一般地每小时同步一次数据即可。

时间跨度大、连续两次请求步数跨度过大，可能会导致步数上传失败。

多个账号配置多个定时器传入不同参数即可。

# 获取
没有账号可以下载`小 米 运 动 App`使用手机号注册（不建议绑定小米账号）

注册后在App中点击`我的`找到`第三方接入`，把对应平台绑定上即可同步。

低调使用。


# 下面是原来的README.md

下面的可忽略


# 运动步数修改工具

[![sport-editor-task](https://github.com/Devifish/sport-editor/actions/workflows/sport-editor-task.yml/badge.svg)](https://github.com/Devifish/sport-editor/actions/workflows/sport-editor-task.yml)
[![star](https://img.shields.io/github/stars/Devifish/sport-editor.svg?logo=github)](https://github.com/Devifish/sport-editor)
[![license](https://img.shields.io/github/license/Devifish/sport-editor)](https://github.com/Devifish/sport-editor)

> 通过华米运动的 API 提交运动步数 😒<br/>
> 可实现同步运动步数至热门平台，如微信、支付宝等

## 实现功能

- [x] 每日自动更新步数
- [x] 指定随机运动步数范围
- [x] Github Action 运行

## 配置参数

| 环境变量                 | 说明                | 值                  |
| ------------------------ | ------------------- | ------------------- |
| XIAOMI_AMAZFIT_USERNAME  | 用户名              | 159000000           |
| XIAOMI_AMAZFIT_PASSWORD  | 密码                | xxxxxx              |
| XIAOMI_AMAZFIT_USER_ID   | 用户 ID (可选)      | 123456              |
| XIAOMI_AMAZFIT_APP_TOKEN | APP Token (可选)    | xxxxxxxx            |
| STED_SIZE_RANGE          | 运动步数范围 (可选) | 5000-15000 (默认值) |

- 推荐使用 Node.js 12 及以上的运行/构建当前项目
- 运动步数范围使用 - 分隔上下限
- 可选账号/密码、UserID/AppToken 两种方式运行

## Github Actions 部署

- fork 本项目
- 将环境变量参数填到 Setting -> Secrets (如果使用 Token+ID 方式可不填用户名及密码)
- 开启 actions (默认`actions`处于禁止状态)
- 执行 sport-editor-task workflow

## 命令行运行

```
git clone https://github.com/Devifish/sport-editor.git
cd sport-editor
npm install
npm run start
```
