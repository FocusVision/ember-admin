import Ember from 'ember'
import IndexControllerMixin
  from 'ember-admin/mixins/model-records/index-controller-mixin'

const {
  Controller
} = Ember

export default Controller.extend(IndexControllerMixin, {
  actions: {
    remove(model, parentModel) {
      parentModel.removeRelated(this.get('relationshipName'), model)
    }
  }
})
