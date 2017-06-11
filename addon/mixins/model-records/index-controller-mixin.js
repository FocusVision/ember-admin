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

  'filter[keyword]': '',
  filterKeyword: alias('filter[keyword]'),

  recordType: computed('model', function() {
    return this.get('model.modelName') ||
      this.get('model.constructor.modelName')
  }),

  actions: {
    onFilterChange(value) {
      this.transitionToRoute({ queryParams: { 'filter[keyword]': value }})
    }
  }
})
