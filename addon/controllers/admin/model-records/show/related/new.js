import Ember from 'ember'
import ResourceControllerMixin
  from 'ember-admin/mixins/model-records/resource-controller-mixin'

const {
  get
} = Ember

export default Ember.Controller.extend(ResourceControllerMixin, {
  excludedColumns: ['id'],

  actions: {
    onFieldUpdate(key, value) {
      this.get('model').set(key, value)
    },

    save() {
      return get(this, 'model')
        .save()
        .then(record => {
          this.transitionToRoute(
            'admin.model-records',
            record.constructor.modelName
          )
        })
    }
  }
})
