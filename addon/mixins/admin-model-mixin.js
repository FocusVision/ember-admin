import Ember from 'ember'
import HasManyQuery from 'ember-data-has-many-query'

const {
  Mixin,
  inject: { service }
} = Ember
const { ModelMixin } = HasManyQuery

export default Mixin.create(ModelMixin, {
  admin: service(),

  removeRelated(...args) {
    const adapter =
      this.get('admin.store').adapterFor(this.constructor.modelName)
    return adapter.removeRelated(this, ...args)
  },
  addRelated(...args) {
    const adapter =
      this.get('admin.store').adapterFor(this.constructor.modelName)
    return adapter.addRelated(this, ...args)
  }
})
