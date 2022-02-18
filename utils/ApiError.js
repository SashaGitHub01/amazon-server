
export class ApiError extends Error {
   status;
   errors;

   constructor(status, message, errors = []) {
      super(message);
      this.status = status;
      this.errors = errors;
   }

   static unauthorized(message = 'Пользователь не авторизован') {
      return new ApiError(401, message)
   }

   static badReq(message, err) {
      return new ApiError(400, message)
   }

   static notFound() {
      return new ApiError(404, 'Обьект не найден')
   }

   static internal(err) {
      return new ApiError(500, err)
   }
}