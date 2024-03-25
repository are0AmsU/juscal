export default (fieldsObj: object) => {
  return Object.keys(fieldsObj).reduce((total: FormData, current: string) => {
    let currentItem: any = fieldsObj[current as keyof typeof fieldsObj]
    if (currentItem[0] instanceof File) {
      total.append(current, currentItem)
      return total
    }
    if (typeof currentItem === 'object') {
      currentItem = JSON.stringify(currentItem)
    }
    total.append(current, currentItem)
    return total
  }, new FormData())
}