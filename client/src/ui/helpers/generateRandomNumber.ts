export default (digitCount: number): number => {
  let min = Math.pow(10, digitCount - 1);
  let max = Math.pow(10, digitCount) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}