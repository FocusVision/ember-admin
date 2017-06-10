import Ember from 'ember'

const {
  Mixin,
  inject: { service }
} = Ember

export default Mixin.create({
  admin: service(),

  queryParams: ['filter[keyword]', 'page', 'size'],
  filter: null,
  page: 1,
  size: 30,

  actions: {
    transitionToRoute(...args) {
      return this.transitionToRoute(...args)
    }
  }
})
