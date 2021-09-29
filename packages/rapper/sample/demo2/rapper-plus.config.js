const { defineConfig } = require('./../../dist/index')

module.exports = defineConfig({
    rapper: {
        tokenCookie: 'aliyungf_tc=1c61ec5da52b24936992e09088bb165c1b3e330ab97eb8e94d02ef00cce15ff7; koa.sid=7BOaxuOt2rvSJH090f_qjJ3ZMD-RcOWu; koa.sid.sig=AP95QQ66-bgEruEjvaWUNBXZitY'
    },
    isUpload: false,
    
    download: {
       //请求 function 模板
       requestFunc(params) {
        function getFnName(url){
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
        const reqTypeName = `IReq${camelCaseName}`;
        const resTypeName = `IRes${camelCaseName}`;
        return {
          reqTypeName,
          resTypeName,
          funcMain: `
              /**
               * 接口名：${params.funcDescription}
               * Rap 地址: ${params.rapUrl}?id=${params.repositoryId}&mod=${params.moduleId}&itf=${params.interfaceId}
               */
               
              export const ${fnName} = <T extends boolean = false>(data: ${reqTypeName}, options?: {
                proxy?: T
                pageError?: boolean
              }): Promise<T extends true ? ${reqTypeName}['data'] : ${resTypeName}> => instance({
                url: '${params.requestUrl}',
                method: '${params.requestMethod}',
                data,
              }, options)
              `,
        };
      },
      //请求 函数共工头（用于引入函数
      requestModule(params) {
        return {
          fileName: params.moduleDescription,
          moduleHeader: `
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import instance from '@/utils/request'
`,
        };
      },
    }
})
