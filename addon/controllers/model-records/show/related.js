import Ember from 'ember'
import ResourceListControllerMixin
  from 'ember-admin/mixins/model-records/resource-list-controller'

const {
  computed,
  Controller
} = Ember

export default Controller.extend(ResourceListControllerMixin, {
  excludedColumns: ['id'],

  recordType: computed('model', function() {
    return this.get('model.relationship.belongsToType')
  })
})
