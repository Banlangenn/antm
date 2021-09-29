/* md5: 43cb529a14625be7a5536df076263e6a */
/* Rap仓库id: 284428 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477853
 */

import type {IReqGoodsQbf, IResGoodsQbf, IReqGoodsAudit, IResGoodsAudit} from './types/testFetchDemo'

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import instance from '@/utils/request'

/**
 * 接口名：goodsQbf
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477853&itf=2081721
 */

export const goodsQbf = <T extends boolean = false>(
  data: IReqGoodsQbf,
  options?: {
    proxy?: T
    pageError?: boolean
  }
): Promise<T extends true ? IReqGoodsQbf['data'] : IReqGoodsQbf> =>
  instance(
    {
      url: '/c/api/1.0/approve/goods/qbf',
      method: 'GET',
      data,
    },
    options
  )

/**
 * 接口名：goodsAudit
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477853&itf=2081722
 */

export const goodsAudit = <T extends boolean = false>(
  data: IReqGoodsAudit,
  options?: {
    proxy?: T
    pageError?: boolean
  }
): Promise<T extends true ? IReqGoodsAudit['data'] : IReqGoodsAudit> =>
  instance(
    {
      url: '/c/api/1.0/approve/goods/audit',
      method: 'GET',
      data,
    },
    options
  )
