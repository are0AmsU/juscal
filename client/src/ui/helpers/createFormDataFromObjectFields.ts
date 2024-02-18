export default (fieldsObj: object) => {
  return Object.keys(fieldsObj).reduce((total: FormData, current: string) => {
    let currentItem: string | object = fieldsObj[current as keyof typeof fieldsObj]
    if (typeof currentItem === 'object') {
      currentItem = JSON.stringify(currentItem)
    }
    total.append(current, currentItem)
    return total
  }, new FormData())
}