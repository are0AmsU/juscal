export const isArrayEqual = (arr1: any[] | null, arr2: any[]): boolean | void => {
  if (arr1) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }
}