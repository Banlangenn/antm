/* md5: 60e841b1b8db26ea36e20ea5ea157247 */
/* Rap仓库id: 284428 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 Rapper 同步 Rap 平台接口，自动生成，请勿修改
 * Rap仓库 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477847
 */

import type {IReqUser, IResUser, IReqUserType, IResUserType} from './types/testTypeDemo'

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import instance from '@/utils/request'

/**
 * 接口名：我是描述
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477847&itf=2081705
 */

export const user = <T extends boolean = false>(
  data: IReqUser,
  options?: {
    proxy?: T
    pageError?: boolean
  }
): Promise<T extends true ? IReqUser['data'] : IReqUser> =>
  instance(
    {
      url: '/c/b/w/api/2.0/user',
      method: 'GET',
      data,
    },
    options
  )

/**
 * 接口名：我是描述2
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477847&itf=2081706
 */

export const userType = <T extends boolean = false>(
  data: IReqUserType,
  options?: {
    proxy?: T
    pageError?: boolean
  }
): Promise<T extends true ? IReqUserType['data'] : IReqUserType> =>
  instance(
    {
      url: '/c/b/w/api/1.0/user/type',
      method: 'GET',
      data,
    },
    options
  )
