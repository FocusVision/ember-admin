import Ember from 'ember'
import RecordTypeMixin from 'ember-admin/mixins/model-records/record-type'
import ResourceListControllerMixin
  from 'ember-admin/mixins/model-records/resource-list-controller'

const {
  Controller
} = Ember

export default Controller.extend(
  RecordTypeMixin,
  ResourceListControllerMixin,
  {}
)
