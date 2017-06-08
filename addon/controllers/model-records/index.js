import Ember from 'ember'

const {
  computed: { alias },
  Controller,
  inject: { controller }
} = Ember

export default Controller.extend({
  modelRecords: controller('model-records'),
  recordType: alias('modelRecords.recordType')
})
