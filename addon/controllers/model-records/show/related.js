import Ember from 'ember'

const {
  computed,
  Controller
} = Ember

export default Controller.extend({
  excludedColumns: ['id'],

  // TODO: Move this into a PaginationAndFilteringMixin
  queryParams: ['filter', 'page', 'size'],
  filter: null,
  page: 1,
  size: 30,
  recordType: computed('model', function() {
    return this.get('model.relationship.belongsToType')
  })
})
