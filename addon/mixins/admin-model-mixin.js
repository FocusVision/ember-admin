import Ember from 'ember'
import HasManyQuery from 'ember-data-has-many-query'

const {
  Mixin
} = Ember
const { ModelMixin } = HasManyQuery

export default Mixin.create(ModelMixin, {
  removeRelated(...args) {
    const adapter = this.store.adapterFor(this.constructor.modelName)
    return adapter.removeRelated(this, ...args)
  }
})
