export default (fieldsObj: object) => {
  return Object.keys(fieldsObj).reduce((total: FormData, current: string) => {
    total.append(current, fieldsObj[current as keyof typeof fieldsObj])
    return total
  }, new FormData())
}