import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupTest } from 'ember-mocha'

describe('Unit | Route | admin/model records/show/related/add', function() {
  setupTest('route:admin/model-records/show/related/add')

  it('exists', function() {
    let route = this.subject()
    expect(route).to.be.ok
  })
})
