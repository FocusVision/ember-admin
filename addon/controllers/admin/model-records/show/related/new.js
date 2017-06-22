import Ember from 'ember'
import ResourceControllerMixin
  from 'ember-admin/mixins/model-records/resource-controller-mixin'
import RelationshipControllerMixin
  from 'ember-admin/mixins/model-records/relationship-controller-mixin'

const {
  computed
} = Ember

export default Ember.Controller.extend(
  ResourceControllerMixin,
  RelationshipControllerMixin,
  {
    excludedColumns: ['id'],

    actions: {
      save() {
        const parentModel = this.get('parentModel')
        const model = this.get('model')

        if (this.get('inverseRelationshipKind') === 'belongsTo') {
          model.set(this.get('inverseRelationshipName'), parentModel)
        }

        model.save().then(record => {
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
  }
)
