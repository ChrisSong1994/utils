/**
 *
 */
import getTag from "./_getTag";
export const isSet = (value: any): boolean => {
  return getTag(value) === "[object Set]";
};
