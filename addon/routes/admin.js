import Ember from 'ember'

const {
  getOwner,
  Route
} = Ember

export default Route.extend({
  model() {
    return getOwner(this).lookup('data-adapter:main')
      .getModelTypes()
      .map(type => type.name)
  }
})
