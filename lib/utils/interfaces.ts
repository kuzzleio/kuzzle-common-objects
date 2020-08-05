'use strict';

/**
 * An interface representing an object with string key and any value
 */
export interface JSONObject {
  [key: string]: JSONObject | any
}

/**
 * Deprecation warning about a specific feature.
 * Only available in developement mode (NODE_ENV=development)
 */
export interface Deprecation {
  /**
   * Version since the feature is deprecated
   */
  version: string;
  /**
   * Information about the deprecation, replacement, etc.
   */
  message: string;
}