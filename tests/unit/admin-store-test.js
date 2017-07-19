import DS from 'ember-data'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupTest } from 'ember-mocha'

const {
  RESTAdapter,
  Model,
  attr
} = DS

describe('Unit | Store | admin', () => {
  setupTest('ember-admin@store:admin', {
    needs: ['service:admin']
  })

  it('defaults to "admin" namespace', function() {
    const adapter = this.subject().adapterFor('dog')

    expect(adapter.namespace).to.equal('admin')
  })

  it(
    "appends ember-admin's namespace to the end of the adapter namespaces",
    function() {
      this.registry.register(
        'adapter:dog',
        RESTAdapter.extend({ namespace: 'api/v1' })
      )
      const adapter = this.subject().adapterFor('dog')

      expect(adapter.namespace).to.equal('api/v1/admin')
    }
  )

  it('allows overriding of default namespace', function() {
    const store = this.subject()
    store.set('admin.namespace', 'hobbes')
    const adapter = store.adapterFor('dog')

    expect(adapter.namespace).to.equal('hobbes')
  })

  it('allows `null` namespace', function() {
    const store = this.subject()
    store.set('admin.namespace', undefined)
    const adapter = store.adapterFor('dog')

    expect(adapter.namespace).to.equal('')
  })

  it(
    'empty admin namespace does not add tralining slash to adapter namespace',
    function() {
      const store = this.subject()
      store.set('admin.namespace', '')
      this.registry.register(
        'adapter:dog',
        RESTAdapter.extend({ namespace: 'api/v1' })
      )
      const adapter = this.subject().adapterFor('dog')

      expect(adapter.namespace).to.equal('api/v1')
    }
  )

  it(
    'resolves custom adapter registered in `admin` namespace',
    function() {
      this.registry.register(
        'adapter:admin/dog',
        RESTAdapter.extend()
      )
      const adapterType = this.subject().adapterFor('dog').toString()

      expect(adapterType).to.contain('adapter:admin/dog')
    }
  )
})
