import Ember from 'ember'
import DS from 'ember-data'

const {
  getOwner,
  get,
  String: { dasherize },
  inject: { service },
  isEmpty
} = Ember

const {
  Store
} = DS

export default Store.extend({
  admin: service(),

  adapterFor(type) {
    if (!this.typeAdapter) {
      this.typeAdapter = {}
    }

    if (this.typeAdapter[type]) {
      return this.typeAdapter[type]
    }

    const resolvedType = this._resolvedType(type)
    const adapter = this._super(resolvedType)
    const adminNamespace = this._resolveNamespace(adapter)
    const adminAdapter = adapter.constructor.extend({
      namespace: adminNamespace
    })
    const resolvedAdapter = this.typeAdapter[type] = adminAdapter.create()

    return resolvedAdapter
  },

  _resolvedType(type) {
    const normalizedType = dasherize(type)

    return getOwner(this)
      .resolveRegistration(`adapter:admin/${normalizedType}`) ?
        `admin.${normalizedType}` :
        normalizedType
  },

  _resolveNamespace(adapter) {
    const adapterNamespace = get(adapter, 'namespace')
    const adminNamespace = this.get('admin.namespace')
    const namespaces = adapterNamespace ? adapterNamespace.split('/') : []
    namespaces.push(adminNamespace)
    const namespace = namespaces.join('/').replace(/\/$/, '')

    return isEmpty(namespace) ? '' : namespace
  }
})
