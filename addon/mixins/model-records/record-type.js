import Ember from 'ember'

const {
  inject,
  computed: { alias },
  Mixin
} = Ember

export default Mixin.create({
  modelRecords: inject.controller('model-records'),
  recordType: alias('modelRecords.recordType')
})
