/*
 * @Author: maoxuena
 * @Date: 2024-10-11 09:53:44
 * @LastEditors: maoxuena
 * @LastEditTime: 2024-10-11 13:24:34
 * @FilePath: \monorepo\packages\utils\src\calculation.ts
 * @Description:
 */

/**
 * @Description: a+b
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export const add = (a: number, b: number): number => a + b;

/**
 * @Description: 计算数组平均值
 * @param {number[]} arr
 * @return {number}
 */
export const average = (arr: number[]): number => arr.reduce((a, b) => a + b) / arr.length;
