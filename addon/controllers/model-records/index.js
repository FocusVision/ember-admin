import Ember from 'ember'
import ResourceListControllerMixin
  from 'ember-admin/mixins/model-records/index-controller-mixin'

const {
  computed: { alias },
  Controller,
  inject: { controller }
} = Ember

export default Controller.extend(ResourceListControllerMixin, {
  modelRecords: controller('model-records'),
  recordType: alias('modelRecords.recordType')
})
