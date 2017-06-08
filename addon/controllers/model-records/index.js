import Ember from 'ember'
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type'
import PaginatedControllerMixin
  from 'ember-admin/mixins/model-records/paginated-controller'

const {
  Controller
} = Ember

export default Controller.extend(RecordTypeMixin, PaginatedControllerMixin, {})
