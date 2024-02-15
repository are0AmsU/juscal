export default (array: any[]) => {
  const rand = Math.floor(Math.random() * array.length);
  return array[rand];
}