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
          inverseRelationshipKind,
          inverseRelationshipName,
          relationshipKind,
          relationshipName
        } = this.relationshipInfo(parentModel)

        parentModel
          .removeRelated(relationshipName, model, relationshipKind)
          .then(() => {
            if (relationshipKind === 'belongsTo') {
              parentModel.set(relationshipName, null)
            } else {
              parentModel.get(relationshipName).removeObject(model)
            }

            if (inverseRelationshipKind === 'belongsTo') {
              model.set(inverseRelationshipName, null)
            } else if (inverseRelationshipKind) {
              model.get(inverseRelationshipName).removeObject(parentModel)
            }
          })
      }
    }
  }
)
