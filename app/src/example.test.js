
import { vi, expect, test } from 'vitest'

import { mysqlTable as table } from 'drizzle-orm/mysql-core'


test('adds 1 + 2 to equal 3', () => {
    const fn = vi.fn()


    const market = {
        getApples: function () {
            return this
        }
    }

    const getApplesSpy = vi.spyOn(market, 'getApples')
    console.log(market.getApples().getApples())
    console.log(getApplesSpy.mock.calls.length)
})