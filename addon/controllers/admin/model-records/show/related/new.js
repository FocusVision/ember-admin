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
          inverseRelationshipKind,
          inverseRelationshipName,
          relationshipKind,
          relationshipName
        } = this.relationshipInfo(parentModel)

        model.save().then(record => {
          parentModel
            .addRelated(relationshipName, record, relationshipKind)
            .then(() => {
              if (relationshipKind === 'belongsTo') {
                parentModel.set(relationshipName, record)
              } else {
                parentModel.get(relationshipName).pushObject(record)
              }

              if (inverseRelationshipKind === 'belongsTo') {
                model.set(inverseRelationshipName, parentModel)
              } else if (inverseRelationshipKind) {
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
