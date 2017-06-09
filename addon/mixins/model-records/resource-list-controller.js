import Ember from 'ember'

const {
  computed: { alias },
  Mixin
} = Ember

export default Mixin.create({
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
