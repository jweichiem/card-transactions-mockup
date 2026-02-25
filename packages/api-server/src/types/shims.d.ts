declare module 'cors' {
  const cors: (...args: unknown[]) => unknown;
  export default cors;
}

declare module 'express' {
  export const Router: (...args: unknown[]) => unknown;
  const express: {
    (...args: unknown[]): unknown;
    json: (...args: unknown[]) => unknown;
  };
  export default express;
}
