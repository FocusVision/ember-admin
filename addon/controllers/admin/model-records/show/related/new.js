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
        const recordName = this.get('recordName')
        const inverseRelationshipName =
          this.inverseRelationshipName(parentModel, recordName)
        const kind = this.relationshipKind(parentModel, recordName)
        const inverseKind =
          this.inverseRelationshipKind(parentModel, recordName)

        if (inverseKind === 'belongsTo') {
          model.set(inverseRelationshipName, parentModel)
        } else {
          model.get(inverseRelationshipName).pushObject(parentModel)
        }

        model.save().then(record => {
          if (kind !== 'belongsTo' && kind !== 'hasMany') {
            return this._transitionToRelated()
          }

          if (kind === 'belongsTo') {
            parentModel.set(recordName, record)
          } else {
            parentModel.get(recordName).pushObject(record)
          }

          parentModel.save().then(() => this._transitionToRelated())
        })
      }
    },

    _transitionToRelated() {
      this.transitionToRoute('admin.model-records.show.related')
    }
  }
)
