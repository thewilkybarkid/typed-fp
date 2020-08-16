import { Uri } from '@typed/fp/Uri'
import { describe, given, it, Test } from '@typed/test'

import { createServerHistoryEnv } from './createServerHistoryEnv'

export const test: Test = describe(`createHistoryEnv`, [
  it(`returns Env with '/' as default location.pathname`, ({ equal }) => {
    const { location } = createServerHistoryEnv()

    equal('/', location.pathname)
  }),

  given(`an href`, [
    it(`returns { history: History, location: Location }`, ({ equal }) => {
      const { location, history } = createServerHistoryEnv(Uri.wrap('http://www.example.com'))

      history.pushState(null, '', '/example')

      equal('http://www.example.com', location.origin)
      equal('80', location.port)

      equal('/example', location.pathname)
      equal('http:', location.protocol)
    }),
  ]),

  describe(`History`, [
    describe(`pushState`, [
      given(`an href with a different protocol`, [
        it(`updates the location correctly`, ({ equal }) => {
          const { location, history } = createServerHistoryEnv(Uri.wrap('https://www.example.com'))

          const href = 'http://www.example.com'

          history.pushState(void 0, '', href)

          equal(href, location.href)
        }),
      ]),
    ]),
  ]),
])
