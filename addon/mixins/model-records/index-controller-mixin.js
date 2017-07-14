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

  pageCount: computed(
    'model.meta.page-count',
    'model.relatedModel.meta.page-count',
    function() {
      return this.get('model.meta.page-count') ||
        this.get('model.relatedModel.meta.page-count')
    }
  ),
  page: 1,
  size: 30,

  'filter[keyword]': computed(() => ''),
  filterKeyword: alias('filter[keyword]'),

  actions: {
    updatePage(page) {
      this.set('page', page)
    },

    view(model) {
      this.transitionToRoute(
        'admin.model-records.show',
        this.get('recordType'),
        model.id
      )
    },

    onFilterChange(value) {
      this.set('filterKeyword', value)
    }
  }
})
