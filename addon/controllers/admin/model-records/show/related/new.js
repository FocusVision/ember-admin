import Ember from 'ember'
import ResourceControllerMixin
  from 'ember-admin/mixins/model-records/resource-controller-mixin'
import RelationshipControllerMixin
  from 'ember-admin/mixins/model-records/relationship-controller-mixin'

export default Ember.Controller.extend(
  ResourceControllerMixin,
  RelationshipControllerMixin,
  {
    excludedColumns: ['id'],

    actions: {
      save(model, parentModel) {
        // recordName is the relationship prop name it is
        // defined on the model set here via paramsFor
        // NOT the modelName

        const recordName = this.get('recordName')
        const relationshipKind =
          this.relationshipKind(parentModel, recordName)

        model.save().then(record => {
          if (relationshipKind === 'belongsTo') {
            parentModel.set(recordName, record)
          } else {
            parentModel.get(recordName).pushObject(record)
          }

          parentModel.save().then(() =>
            this.transitionToRoute('admin.model-records.show.related'))
        })
      }
    }
  }
)
