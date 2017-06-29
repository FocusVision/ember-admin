import Ember from 'ember'

const {
  Mixin,
  inject: { service },
  computed,
  computed: { alias }
} = Ember

export default Mixin.create({
  admin: service(),

  queryParams: ['filter[keyword]', 'page', 'size'],

  pageCount: alias('model.meta.page-count'),
  page: 1,
  size: 30,

  'filter[keyword]': computed(() => ''),
  filterKeyword: alias('filter[keyword]'),

  actions: {
    onFilterChange(value) {
      this.set('filterKeyword', value)
    }
  }
})
