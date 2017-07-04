import Ember from 'ember'
import IndexControllerMixin
  from 'ember-admin/mixins/model-records/index-controller-mixin'
import RelationshipControllerMixin
  from 'ember-admin/mixins/model-records/relationship-controller-mixin'

const {
  Controller
} = Ember

export default Controller.extend(
  IndexControllerMixin,
  RelationshipControllerMixin,
  {
    actions: {
      remove(model, parentModel) {
        const recordName = this.get('recordName')
        const relationshipKind =
          this.relationshipKind(parentModel, recordName)
        const inverseRelationshipName =
          this.inverseRelationshipName(parentModel, recordName)
        const inverseRelationshipKind =
          this.inverseRelationshipKind(parentModel, recordName)

        debugger
        if (inverseRelationshipKind === 'belongsTo') {
          model.set(inverseRelationshipName, null)
        }

        if (inverseRelationshipKind === 'hasMany') {
          model.get(inverseRelationshipName).removeObject(parentModel)
        }

        if (relationshipKind === 'belongsTo') {
          parentModel.set(recordName, null)
        }

        if (relationshipKind === 'hasMany') {
          parentModel.get(recordName).removeObject(model)
        }

        model.save().then(() => {
          parentModel.save()
        })
      }
    }
  }
)
