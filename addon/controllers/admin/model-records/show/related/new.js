import Ember from 'ember'
import ResourceControllerMixin
  from 'ember-admin/mixins/model-records/resource-controller-mixin'

const {
  computed,
  get,
  guidFor
} = Ember

export default Ember.Controller.extend(ResourceControllerMixin, {
  excludedColumns: ['id'],

  relationshipKind: computed('', function() {
    return this
      .get('parentModel')
      .get('constructor.relationshipsByName')
      .get(this.get('recordName'))
  }),

  actions: {
    onFieldUpdate(key, value) {
      this.get('model').set(key, value)
    },

    save() {
      const parentModel = this.get('parentModel')
      const model = this.get('model')

      return model.save().then((record) => {
        if (this.get('relationshipKind').kind === 'belongsTo') {
          parentModel.set(this.get('recordName'), record)
        } else {
          parentModel.get(this.get('recordName')).pushObject(record)
        }

        parentModel.save().then(() =>
          this.transitionToRoute('admin.model-records.show.related'))
      })
    }
  }
})
