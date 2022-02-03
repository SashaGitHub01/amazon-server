import Decimal from "decimal.js";

export const toFixedRate = (num) => {
   const dec = new Decimal(num);

   return Number(dec.toFixed(1))
}