/* md5: 2f4f38e7e1451e745ae1884b84a3d617 */
/* eslint-disable */

/**
 * 接口名：goodsQbf
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477853&itf=2081721
 */
export type IReqGoodsQbf = {
  age: string
  sex?: string
  /**
   * 新加的 c
   */
  goods?: {
    arr: {
      count: string
      name: string
    }
  }
  goods2: {
    count: string
    name: string
  }
}

export type IResGoodsQbf = {
  /**
   *
   * @value true
   */
  success: boolean
  data: {
    /**
     * 数组演示
     * @rule 5
     */
    array: {
      /**
       * n名称
       * @value /@cname
       */
      name: string
      /**
       * 年纪
       * @value /@increment(10)
       */
      age: string
      /**
       * 心别
       * @value /@increment(10)
       */
      sex: number
    }[]
  }
  /**
   *
   * @value 0
   */
  code: number
}

/**
 * 接口名：goodsAudit
 * Rap 地址: http://rap2.taobao.org/repository/editor?id=284428&mod=477853&itf=2081722
 */
export type IReqGoodsAudit = Record<string, unknown>
export type IResGoodsAudit = {
  request: {
    shape: {
      size: number
    }
    point: {
      x: number
      y: number
    }
    radius: number
  }
  response: {
    data: {
      shape: {
        size: number
      }
      point: {
        x: number
        y: number
      }
      radius: number
    }
    success: boolean
  }
}
