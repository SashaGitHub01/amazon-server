import Decimal from "decimal.js";

export const toFixedPrice = (num) => {
   const dec = new Decimal(num);

   return Number(dec.toFixed(2))
}