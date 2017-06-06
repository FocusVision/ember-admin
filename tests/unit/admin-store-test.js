import Ember from 'ember'
import DS from 'ember-data'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupTest } from 'ember-mocha'

const {
  getOwner
} = Ember

const {
  RESTAdapter
} = DS

describe('Unit | Store | admin', () => {

  setupTest('ember-admin@store:admin', {
    needs: ['service:admin']
  })

  it('defaults to "api" namespace', function() {
    let adapter = this.subject().adapterFor('dog')
    expect(adapter.namespace).to.equal('admin')
  })

  it(
    "appends ember-admin's namespace to the end of the adapter namespaces",
    function() {
      this.container.owner.register(
        'adapter:dog',
        RESTAdapter.extend({ namespace: 'api/v1' })
      )

      const adapter = this.subject().adapterFor('dog')
      expect(adapter.namespace).to.equal('api/v1/admin')
  })

  it('allows overriding of default namespace', function() {
    const store = this.subject()

    store.set('adminService.namespace', 'hobbes')

    const adapter = store.adapterFor('dog')

    expect(adapter.namespace).to.equal('hobbes')
  })

  it('allows `null` namespace', function() {
    const store = this.subject()

    store.set('adminService.namespace', undefined)

    const adapter = store.adapterFor('dog')

    expect(adapter.namespace).to.equal(undefined)
  })

  it(
    'empty admin namespace does not add tralining slash to adapter namespace',
    function() {
      const store = this.subject()
      store.set('adminService.namespace', '')

      this.container.owner.register(
        'adapter:dog',
        RESTAdapter.extend({ namespace: 'api/v1' })
      )

      const adapter = this.subject().adapterFor('dog')

      expect(adapter.namespace).to.equal('api/v1')
    }
  )
})
