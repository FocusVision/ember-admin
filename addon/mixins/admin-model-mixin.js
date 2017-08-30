import Ember from 'ember'
import HasManyQuery from 'ember-data-has-many-query'

const {
  Mixin,
  computed,
  inject: { service }
} = Ember
const { ModelMixin } = HasManyQuery

export default Mixin.create(ModelMixin, {
  admin: service(),
  adminAdapter: computed('admin.store', function() {
    return this.get('admin.store').adapterFor(this.constructor.modelName)
  }),

  removeRelated(...args) {
    return this.get('adminAdapter').removeRelated(this, ...args)
  },
  addRelated(...args) {
    return this.get('adminAdapter').addRelated(this, ...args)
  },
  createRelated(...args) {
    return this.get('adminAdapter').createRelated(this, ...args)
  }
})
