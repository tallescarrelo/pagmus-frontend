/**
 * Config source: https://git.io/JfefZ
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import type { ApplicationConfig } from '@ioc:Adonis/Core/Application'

/*
|--------------------------------------------------------------------------
| Application secret key
|--------------------------------------------------------------------------
|
| The secret to encrypt cookies, sessions and other sensitive data.
| Make sure to keep it secret and don't commit it to version control.
|
*/
export const appKey: string = Env.get('APP_KEY')

export const http: ApplicationConfig['http'] = {
  /*
  |--------------------------------------------------------------------------
  | Allow method spoofing
  |--------------------------------------------------------------------------
  |
  | Method spoofing enables defining custom HTTP verbs such as `PUT` or `DELETE`
  | using query string `_method`. Spoofing is only enabled when the original
  | request method is `POST`.
  |
  */
  allowMethodSpoofing: false,

  /*
  |--------------------------------------------------------------------------
  | Sub domain offset
  |--------------------------------------------------------------------------
  |
  | The offset to be used for reading the subdomain from the host
  | header.
  |
  */
  subdomainOffset: 2,

  /*
  |--------------------------------------------------------------------------
  | Generate request id
  |--------------------------------------------------------------------------
  |
  | Whether or not to generate a unique request id for each HTTP
  | request. The id can later be used by checking `request.id()`.
  |
  */
  generateRequestId: false,

  /*
  |--------------------------------------------------------------------------
  | Trusty proxies
  |--------------------------------------------------------------------------
  |
  | Define the trusted proxy servers. The setting is applied when
  | "trustProxy" is enabled.
  |
  */
  trustProxy: (address) => {
    return address === '127.0.0.1' || address === '::ffff:127.0.0.1' || address === '::1'
  },

  /*
  |--------------------------------------------------------------------------
  | JSONP Callback
  |--------------------------------------------------------------------------
  |
  | Default jsonp callback to be used when callback query string is missing
  | in request url.
  |
  */
  jsonpCallbackName: 'callback',
}