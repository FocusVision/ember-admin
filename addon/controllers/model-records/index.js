import Ember from 'ember'
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type'

const {
  Controller
} = Ember

export default Controller.extend(RecordTypeMixin, {
  // TODO: Move this into a PaginationAndFilteringMixin
  queryParams: ['filter', 'page', 'size'],
  filter: {},
  page: 1,
  size: 30
})
