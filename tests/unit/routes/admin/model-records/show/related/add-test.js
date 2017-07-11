import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupTest } from 'ember-mocha'

describe('Unit | Route | admin/model records/show/related/add', () => {
  setupTest('route:admin/model-records/show/related/add', {
    needs: ['service:admin']
  })

  it('exists', function() {
    const route = this.subject()

    expect(route).to.be.ok
  })
})
