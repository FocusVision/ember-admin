import Ember from 'ember'
import ResourceControllerMixin
  from 'ember-admin/mixins/model-records/resource-controller-mixin'

const {
  computed
} = Ember

export default Ember.Controller.extend(ResourceControllerMixin, {
  excludedColumns: ['id'],

  relationshipKind: computed('parentModel', function() {
    return this
      .get('parentModel')
      .relationshipFor(this.get('recordName'))
      .kind
  }),

  inverseRelationshipName: computed('recordName', 'parentModel', function() {
    return this.get('parentModel')
      .relationshipFor(this.get('recordName'))
      .options.inverse
  }),

  inverseRelationshipKind: computed('inverseRelationshipName', function() {
    const model = this.get('model')
    const inverse = this.get('inverseRelationshipName')
    return model.relationshipFor(inverse) && model.relationshipFor(inverse).kind
  }),

  actions: {
    save() {
      const parentModel = this.get('parentModel')
      const model = this.get('model')

      if (this.get('inverseRelationshipKind') === 'belongsTo') {
        model.set(this.get('inverseRelationshipName'), parentModel)
      }

      return model.save().then(record => {
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
