import Ember from 'ember'

const {
  Mixin
} = Ember

export default Mixin.create({
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
