import Ember from 'ember'

const {
  Mixin,
  inject: { service },
  computed: { alias }
} = Ember

export default Mixin.create({
  admin: service(),

  queryParams: ['filter[keyword]', 'page', 'size'],
  page: 1,
  size: 30,

  'filter[keyword]': '',
  filterKeyword: alias('filter[keyword]'),

  actions: {
    onFilterChange(value) {
      this.transitionToRoute({ queryParams: { 'filter[keyword]': value }})
    }
  }
})
