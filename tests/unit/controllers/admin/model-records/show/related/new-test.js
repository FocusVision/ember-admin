import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupTest } from 'ember-mocha'

describe('Unit | Controller | admin/model records/show/related/new',
  () => {
    setupTest('controller:admin/model-records/show/related/new', {
      needs: ['service:admin']
    })

    it('exists', function() {
      const controller = this.subject()
      expect(controller).to.be.ok
    })
  }
)
