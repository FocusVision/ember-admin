import { expect } from 'chai'
import { describe, it } from 'mocha'
import { formatResourceName } from 'ember-admin/helpers/format-resource-name'

describe('Unit | Helper | format resource name', function() {
  it('pluralizes and capitalizes string', function() {
    let result = formatResourceName(['mouse'])

    expect(result).to.equal('Mice')
  })
})
