# Easy BI API Server

> Easy BI 前端 API 服务

## 目录结构

```bash
.
├── Dockerfile
├── README.md
├── app.ts                  # 应用入口
├── bin
│   ├── start-server.sh
│   └── stop-server.sh
├── chromium                # 本地 chromium 运行环境
├── config                  # 配置项
│   └── pm2.json
├── dist                    # 输出路径
├── index.ts                # 入口文件
├── logs                    # 本地日志
├── package.json
├── src                     # 源码文件
│   ├── controller.ts       # ├──接口处理逻辑
│   ├── logger.ts           # ├──日志配置
│   ├── logic.ts            # ├──Puppeteer调用逻辑
│   ├── router.ts           # ├──路由配置
│   └── utils.ts            # ├──助手类
├── tsconfig.json
└── yarn.lock
```

## License

ISC 技术与数据中心-数据与智能部-系统研发部
