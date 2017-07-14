import { expect } from 'chai'
import { describe, it } from 'mocha'
import { formatColumnName } from 'ember-admin/helpers/format-column-name'

describe('Unit | Helper | format column name', () => {
  it('Adds spaces and capitalizes', () => {
    const result = formatColumnName(['camelCasedKey'])

    expect(result).to.equal('Camel cased key')
  })
})
