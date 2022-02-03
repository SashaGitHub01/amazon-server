
export class UserDto {
   email;
   username;
   cart;
   id;
   rates;
   orders;

   constructor(user) {
      this.username = user.username;
      this.email = user.email;
      this.cart = user.cart;
      this.id = user._id;
      this.rates = user.rates;
      this.orders = user.orders;
   }
}