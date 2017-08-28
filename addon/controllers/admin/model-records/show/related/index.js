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
        const inverseRelationshipName =
          this.inverseRelationshipName(parentModel, recordName)
        const kind = this.relationshipKind(parentModel, recordName)
        const inverseKind =
          this.inverseRelationshipKind(parentModel, recordName)

        parentModel.removeRelated(recordName, model, kind).then(() => {
          if (kind === 'belongsTo') {
            parentModel.set(recordName, null)
          } else {
            parentModel.get(recordName).removeObject(model)
          }

          if (inverseKind === 'belongsTo') {
            model.set(inverseRelationshipName, null)
          } else if (inverseKind) {
            model.get(inverseRelationshipName).removeObject(parentModel)
          }
        })
      }
    }
  }
)
