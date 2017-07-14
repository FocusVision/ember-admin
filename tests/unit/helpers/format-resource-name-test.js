import { expect } from 'chai'
import { describe, it } from 'mocha'
import { formatResourceName } from 'ember-admin/helpers/format-resource-name'

describe('Unit | Helper | format resource name', () => {
  it('pluralizes and capitalizes string', () => {
    const result = formatResourceName(['mouse'])

    expect(result).to.equal('Mice')
  })
})
