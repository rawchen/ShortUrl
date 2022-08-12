# 短链生成服务 - ShortUrl

## 演示及开发环境

> https://ivii.cn
>
> JDK 8 + IDEA 2021

## 使用

* 确保java8及以上环境，在[releases](https://github.com/rawchen/ShortUrl/releases)页面下载jar运行程序。
* 通过`java -jar ShortUrl.jar`运行该程序，默认访问地址：[http://localhost:8989](http://localhost:8989)。
* Linux部署使用如下命令：
```bash
nohup java -jar -Xmx200m ShortUrl.jar >> ShortUrl.log  &
```

## 开发

* 确保java8及以上环境，下载项目后通过IDEA打开，可配置application.yml中的端口号等，通过Maven打包jar运行，没有IDEA也可配置Maven命令执行`mvn clean package`。


## 功能

- [x] 有效期
- [x] 访问密码
- [x] 随机短链
- [x] 生成二维码
- [x] 接口限流

## 案例截图

> https://ivii.cn