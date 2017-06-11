import Ember from 'ember'
import IndexControllerMixin
  from 'ember-admin/mixins/model-records/index-controller-mixin'

const {
  computed,
  Controller
} = Ember

export default Controller.extend(IndexControllerMixin, {
  recordType: computed('model.relationship', function() {
    return this.get('model.relationship.belongsToType')
  })
})
