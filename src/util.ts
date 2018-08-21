const defaultDegreeUnit = 180 / Math.PI;

export const hasProxy = typeof Proxy !== "undefined";
export const OBFUSCATED_ERROR =
  'An invariant failed, however the error is obfuscated because this is an production build.';

export function radian2degree(rad, multiply?) {
  if (!!multiply) {
    return multiply(rad, defaultDegreeUnit).toString();
  } else {
    return rad * defaultDegreeUnit;
  }
}

export function degree2radian(deg, divide?) {
  if (!!divide) {
    return divide(deg, defaultDegreeUnit);
  } else {
    return deg / defaultDegreeUnit;
  }
}

export function invariant(check: false, message: string | boolean): never;
export function invariant(check: true, message: string | boolean): void;
export function invariant(check: any, message: string | boolean): void;
export function invariant(check: boolean, message: string | boolean) {
  if (!check) throw new Error('[vector-n] ' + (message || OBFUSCATED_ERROR));
}

/**
 * Prints a deprecation message, but only one time.
 * Returns false if the deprecated message was already printed before
 */
const deprecatedMessages: string[] = [];

export function deprecated(msg: string): boolean;
export function deprecated(thing: string, replacement: string): boolean;
export function deprecated(msg: string, thing?: string): boolean {
  if (process.env.NODE_ENV === 'production') return false;
  if (thing) {
    return deprecated(`'${msg}', use '${thing}' instead.`);
  }
  if (deprecatedMessages.indexOf(msg) !== -1) return false;
  deprecatedMessages.push(msg);
  console.error('[vector-n] Deprecated: ' + msg);
  return true;
}

export function fail(message: string | boolean): never {
  invariant(false, message)
  throw "X" // unreachable
}

export function isPlainObject(value) {
  if (value === null || typeof value !== "object") return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}
