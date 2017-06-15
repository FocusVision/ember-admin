import Ember from 'ember'

const {
  getOwner,
  Route,
  computed
} = Ember

export default Route.extend({
  modelNames: computed(function() {
    return getOwner(this).lookup('data-adapter:main')
      .getModelTypes()
      .map(type => type.name)
  }),

  model() {
    return this.get('modelNames')
  }
})
