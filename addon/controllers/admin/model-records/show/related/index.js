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
        const {
          inverseKind,
          inverseRelationshipName,
          kind,
          relationshipName
        } = this.relationshipInfo(parentModel)

        parentModel.removeRelated(relationshipName, model, kind).then(() => {
          if (kind === 'belongsTo') {
            parentModel.set(relationshipName, null)
          } else {
            parentModel.get(relationshipName).removeObject(model)
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
