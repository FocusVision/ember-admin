import Ember from 'ember'
import DS from 'ember-data'

const {
  getOwner,
  String: { dasherize }
} = Ember

const {
  Store
} = DS

export default Store.extend({
  adapterFor(type) {

    if (!this.typeAdapter) {
      this.typeAdapter = {}
    }

    if (this.typeAdapter[type]) {
      return this.typeAdapter[type]
    }

    const resolvedType = this._resolvedType(type)
    const adapter = this._super(resolvedType)
    const adminAdapter = adapter.constructor.extend()
    const resolvedAdapter = this.typeAdapter[type] = adminAdapter.create()

    return resolvedAdapter
  },

  _resolvedType(type) {
    const normalizedType = dasherize(type)

    return getOwner(this)
      .resolveRegistration(`adapter:admin/${normalizedType}`) ?
        `admin.${normalizedType}` :
        normalizedType
  }
})
