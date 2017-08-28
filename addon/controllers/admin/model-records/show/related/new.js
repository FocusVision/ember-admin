import Ember from 'ember'
import ResourceControllerMixin
  from 'ember-admin/mixins/model-records/resource-controller-mixin'
import RelationshipControllerMixin
  from 'ember-admin/mixins/model-records/relationship-controller-mixin'

const {
  Controller
} = Ember

export default Controller.extend(
  ResourceControllerMixin,
  RelationshipControllerMixin,
  {
    excludedColumns: ['id'],

    actions: {
      save(model, parentModel) {
        const {
          inverseKind,
          inverseRelationshipName,
          kind,
          relationshipName
        } = this.relationshipInfo(parentModel)


        model.save().then(record => {
          parentModel.addRelated(relationshipName, record, kind).then(() => {
            if (kind === 'belongsTo') {
              parentModel.set(relationshipName, record)
            } else {
              parentModel.get(relationshipName).pushObject(record)
            }

            if (inverseKind === 'belongsTo') {
              model.set(inverseRelationshipName, parentModel)
            } else if (inverseKind) {
              model.get(inverseRelationshipName).pushObject(parentModel)
            }
            this._transitionToRelated()
          })
        })
      }
    },

    _transitionToRelated() {
      this.transitionToRoute('admin.model-records.show.related')
    }
  }
)
