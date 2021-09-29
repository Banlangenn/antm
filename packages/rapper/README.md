[![MIT License][license-shield]][license-url]

## Rapper 是什么？

Rapper 是 TypeScript 的最佳拍档，它可以帮你生成具有类型定义的请求方案。

- 无需自行书写请求代码，把 HTTP 接口当做函数调用
- 请求参数/返回数据类型化，静态校验、自动补全快到飞起



## RapperPlus 是什么？
基于 Rapper 开发，使配置更灵活，同时增加本地类型同步远程文档重要功能
- ++++
- 本地接口类型上传到rapper远程文档，本地编码驱动远程文档
- 自定义请求函数模板，满足不同编程规范

## 快速开始

上传 34xx 模块 接口
```bash
$ npx rapper-plus --u --m 34xx
```
上下载 34xx 模块 接口
```bash
$ npx rapper-plus --d --m 34xx
```
## 文档

### 命令函入参会和config合并（命令行优先级更高）

* --u  上传
* --d  下载
* --m xx  指定moduleId，不传默认全部
###  RapperPlus 配置config   有三种方案

* 方案一（推荐）

  通过rapperPlus.config.js配置config

    ```js
    <!-- rapperPlus.config.js文件 -->
    const RapperPlus = require('rapper-plus')
    <!--  使用RapperPlus 提供 defineConfig 会有类型提示 -->
    export.default = RapperPlus.defineConfig({
      upload: { xx: xx }, // 本地上传 配置
      download: { xx: xx } // 远程下载 配置
    })
    ```
* 方案二
    通过 命令行参数执行config 路径
    ```bash
      $ npx rapper-plus --config  ./config/index.js
    ```
   
    ```js
    <!-- ./config/index.js文件 -->
    const RapperPlus = require('rapper-plus')
    <!--  使用RapperPlus 提供 defineConfig 会有类型提示 -->
    export.default = RapperPlus.defineConfig({
      upload: { xx: xx }, // 本地上传 配置
      download: { xx: xx } // 远程下载 配置
    })
    ```



* 方案三
  通过 package.json 配置 rapper-Plus 


    ```js
    <!--package.json  文件  -->
    {
      'rapper-Plus': {
        upload: { xx: xx }, // 本地上传 配置
        download: { xx: xx } // 远程下载 配置
      }
    }
    ```

## 本地代码类型同步到远程raper文档
* 解析本地文件
* fetch 方法追加注释 （接口id  接口模块id）
* 格式化 类型
* 调用rapper 接口

## 增量更新实现
* 每次更新会给文件头部 加一个 MD5值
* 初始化会检查合法的文件（符合formatFunc  结构的文件） MD5值 对不住
* 去解析当前恩建以及 依赖当前文件的文件
* 提交变更的模块接口（文件级检查）,做不到方法级检查
## config 接口类型
```ts

interface IConfig {
    download: {
        requestFunc?: (params: {
            funcDescription: string;
            repositoryId: number;
            moduleId: number;
            interfaceId: number;
            requestUrl: string;
            requestMethod: string;
            rapUrl: string;
        }) => {
            reqTypeName: string;
            resTypeName: string;
            funcMain: string
        };
        requestModule?: (params: {
            repositoryId: number;
            moduleId: number;
            moduleRapUrl: string;
            moduleDescription: string
        }) => {
            fileName: string;
            moduleHeader: string;
        };
        moduleId?: number;
    }
    rapper: {
      // 拉取接口地址
      apiUrl?: string;
      /** rap 前端地址，默认是 http://rap2.taobao.org */
      rapUrl?: string;
      matchDir?: string;
      tokenCookie?:string;
      repositoryId?: number,
    },
     upload: {
        formatFunc?: (params: IFuncInfo) => ITypeName;
        moduleId?: number;
        alias?: Record<string, string>;
    }
    __completion?: boolean
}


export type IOptions = Partial<IConfig>

```

## defaultConfig 会和传进来的config合并补全

```js
    const defaultOptions = {
      download: {
        //请求 function 模板
        requestFunc(params) {
          function getFnName(url: string): null | string {
            const fnName = url.match(/\/([.a-z0-9_-]+)\/([a-z0-9_-]+$)/i);
            if (fnName && fnName.length === 3) {
              if (/^\d+\.\d+$/.test(fnName[1])) {
                return fnName[2];
              }
              return fnName[1] + fnName[2].charAt(0).toUpperCase() + fnName[2].slice(1);
            }
            return null;
          }
          const fnName = getFnName(params.requestUrl);
          if (!fnName) {
            throw new TypeError('接口路径不对,请修改合规');
          }
          const camelCaseName = `${fnName.charAt(0).toUpperCase()}${fnName.slice(1)}`;
          const paramsType = `IReq${camelCaseName}`;
          const returnType = `IRes${camelCaseName}`;
          return {
            paramsType,
            returnType,
            funcMain: `
              /**
               * 接口名：${params.funcDescription}
               * Rap 地址: ${params.rapUrl}?id=${params.repositoryId}&mod=${params.moduleId}&itf=${params.interfaceId}
               */
              export const ${fnName} = <T extends boolean = false>(
                data: ${paramsType},
                options?: {
                  proxy?: T
                  pageError?: boolean
                }
              ): Promise<IResType<T, ${returnType}>> => {
                
                return instance(
                  {
                    url: '${params.requestUrl}',
                    method: '${params.requestMethod}',
                    data,
                  },
                  options
                ) as Promise<any>
              }
              `,
          };
        },
        //请求 函数共工头（用于引入函数
        requestModule(params) {
          return {
            fileName: params.moduleDescription,
            moduleHeader: `
            import instance from '@/utils/request'
          
            type IResType<T extends boolean, U extends {data: any}> = T extends true ? U['data'] : U
          
            `,
          };
        },
        rap: {
          apiUrl:
            'http://rap2api.taobao.org/repository/get?id=284428&token=TTDNJ7gvXgy9R-9axC-7_mbi4ZxEPlp6',
          /** rap 前端地址，默认是 http://rap2.taobao.org */
          rapUrl: 'http://rap2.taobao.org',
          rapperPath: './src/actions',
        },
      },
      upload: {
        // 根据函数信息 过滤出 有用信息
        formatFunc(params) {
          return {
            returnType: params.returnType.match(/T,\s*(\w+)>>$/)[1],
            paramsType: params.paramsType[0].data,
            fetchUrl: params.comment.match(/http:\/\/rap2\.tao[\s\S]+&itf=\d+/)[0],
          };
        },
        // webpack 别名 alias 绝对路径
        alias: {
          '@': './src',
        },
        // 上传 token
        tokenCookie:
          'aliyungf_tc=ed5eefe153b8cd6d7a9b0ea3f4aaaa92eaf022825c19857a2b435978264d17d8; koa.sid=MzB5TnJaGWkQK6DL7MAFt_qp18DfQ41Q; koa.sid.sig=ujNSfud5538kuHWTx0zYRHXnDSU',
        //会递归遍历啊所有附和 当前文件的 文件
        matchDir: './src/actions',
      }
    }
    ```