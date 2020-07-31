'use strict';

/**
 * An interface representing an object with string key and any value
 */
export interface JSONObject {
  [key: string]: JSONObject | any
}

/**
 * Deprecation warning about a specific functionnality.
 * Only available in developement mode (NODE_ENV=development)
 */
export interface Deprecation {
  version: string;
  message: string;
}