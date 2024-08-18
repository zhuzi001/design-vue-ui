# 中电前端规范

>:smile: :laughing: :blush: :smiley: :relaxed: :smirk: :heart_eyes: :kissing_heart: :kissing_closed_eyes: :flushed: :relieved: :satisfied: :grin:
:wink: :stuck_out_tongue_winking_eye: :stuck_out_tongue_closed_eyes: :grinning: :kissing: :kissing_smiling_eyes: :stuck_out_tongue: :sleeping: :worried: :frowning: :anguished: :open_mouth: :grimacing:

```
create: tanwenchao
update: huangxiaomei renyong
```

**项目环境**:
- 77: 开发
- 70: 测试
- 71: 联调
- 81: 生产

**各个项目环境devops介绍**:
- 开发: 提交到master后自动触发流水线
- 测试: tag更新后自动触发流水线, tag需基于master的最新代码
- 联调: release分支更新后触发审批, 测试人员同意审批后触发流水线
- 生产: 略过，生产环境不用开发人员触碰

### 一些常用的命令
**打tag**
```bash
# 本地提交tagTAG-SUBMIT.v1.0.0备注TAG-SUBMIT.v1.0.0
$ git tag -a TAG-SUBMIT.v1.0.0 -m TAG-SUBMIT.v1.0.0
# 推送tag至remote
$ git push origin TAG-SUBMIT.v1.0.0
```

**创建release**
```bash
# 本地创建分支
$ git branch release-v1.0.0
# 切换到创建的分支
$ git checkout release-v1.0.0
# 把本地创建的分支提交至remote
$ git push origin release-v1.0.0
```

### 关于版本号
**命名规范**
<b>v1.2.3</b> 主版本号.子版本号.修正版本号

**命名原则**
- 项目初版本时，版本号可以为`v1.0.0`
- 当项目有功能模块大修正或新增时，主版本号不变，子版本产品给出的版本号保持一致，修正版本号归零，比如`v1.1.0`
- 当项目在进行了局部修改或 bug 修正时，主版本号和子版本号都不变，修正版本号加 1，比如`v1.1.1`

**具体作用**
+ 区分发布的版本和本地是否一致
+ 让产品和测试等对项目版本有明确的认识，此版本具体发布和更新了什么内容
+ 当生产和联调环境有问题时，利于运维人员对生产环境的有回归版本依据，比如v1.1.1有误，需紧急回归至v1.1.0

**一些建议**
+ tag的版本号和package.json中的版本号保持一致，release中的版本号和最新的tag版本号保持一致


### 关于tag和release

:hammer: tag命名规范
- `TAG-SUBMIT.v1.0.0`<font face="黑体" color=red size=1>&nbsp;&nbsp;必须已TAG-SUBMIT.开头，具体版本号已自己package.json中的version为准</font>

:hammer: release命名规范
- `release-v1.0.0` <font face="黑体" color=red size=1>&nbsp;&nbsp;必须已release-开头，具体版本号已自己package.json中的version为准</font>

### 一些踩过的坑儿 :sob::sob::sob:

q: 推送release分支后测试审批流程中没有版本号拒绝通过？
a: 切换至release分支，然后随意修改某个文件后push至remote重新触发审批流程
 *  *  *
q: ？？？
a: ！！！