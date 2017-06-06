import Ember from 'ember'
import DS from 'ember-data'

const {
  getOwner,
  isEmpty,
  get,
  inject: { service }
} = Ember

const {
  Store
} = DS

export default Store.extend({
  adminService: service('admin'),

  adapterFor(type) {
    if (!this.typeAdapter) {
      this.typeAdapter = {}
    }

    if (!this.typeAdapter[type]) {
      let namespaces = []
      const adapter = this._super(type)
      const adminService = this.get('adminService')

      if (get(adapter, 'namespace')) {
        namespaces = get(adapter, 'namespace').split('/')
      }

      namespaces.push(adminService.namespace)

      let namespace = namespaces.join('/')
      namespace = namespace.replace(/\/$/, '')

      if (isEmpty(namespace)) {
        namespace = undefined
      }

      const AdminAdapter = adapter.constructor.extend({
        namespace
      })

      this.typeAdapter[type] = AdminAdapter.create()
    }

    return this.typeAdapter[type]
  }
})
