declare module 'cors' {
  const cors: (...args: unknown[]) => unknown;
  export default cors;
}

declare module 'express' {
  export const Router: (...args: unknown[]) => any;
  const express: {
    (...args: unknown[]): any;
    json: (...args: unknown[]) => unknown;
  };
  export default express;
}
