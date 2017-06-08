import Ember from 'ember'
import PaginatedControllerMixin
  from 'ember-admin/mixins/model-records/paginated-controller'

const {
  computed,
  Controller
} = Ember

export default Controller.extend(PaginatedControllerMixin, {
  excludedColumns: ['id'],

  recordType: computed('model', function() {
    return this.get('model.relationship.belongsToType')
  })
})
