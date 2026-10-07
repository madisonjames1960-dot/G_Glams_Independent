export const formatNaira = (n) =>
  n == null || n === "" || Number.isNaN(Number(n))
    ? null
    : `\u20a6${Number(n).toLocaleString("en-NG")}`;