import Ember from 'ember'
import ResourceControllerMixin
  from 'ember-admin/mixins/model-records/resource-controller-mixin'

const {
  Controller
} = Ember

export default Controller.extend(ResourceControllerMixin, {
  excludedColumns: ['id'],

  actions: {
    save(model, parentModel) {
      model.save().then(record => {
        parentModel
          .addRelated(this.get('relationshipName'), record)
          .then(() => {
            this._transitionToRelated()
          })
      })
    }
  },

  _transitionToRelated() {
    this.transitionToRoute('admin.model-records.show.related')
  }
})
