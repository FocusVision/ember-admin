import Ember from 'ember'
import ResourceListControllerMixin
from 'ember-admin/mixins/model-records/resource-list-controller'

const {
  computed: { alias },
  Controller,
  inject: { controller }
} = Ember

export default Controller.extend(ResourceListControllerMixin, {
  modelRecords: controller('admin.model-records'),
  recordType: alias('modelRecords.recordType')
})
