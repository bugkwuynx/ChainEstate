export const generateRandomNumber = ( max?: number ): number => {
    if ( max )
        return Math.floor( Math.random() * max );

    return Math.floor( Math.random() * 200000 );
};

export const generateRandomString = (length?: number): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  if (!length) {
    length = 10;
  }
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};