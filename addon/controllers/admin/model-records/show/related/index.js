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
      remove(model) {
        const parentModel = this.get('parentModel')
        const inverseRelationshipName = this.get('inverseRelationshipName')
        const recordName = this.get('recordName')

        if (this._inverseRelationshipKind(model) === 'belongsTo') {
          model.set(inverseRelationshipName, null)
        }

        if (this._inverseRelationshipKind(model) === 'hasMany') {
          model.get(inverseRelationshipName).removeObject(parentModel)
        }

        if (this.get('relationshipKind') === 'belongsTo') {
          parentModel.set(recordName, null)
        } else {
          parentModel.get(recordName).removeObject(model)
        }

        model.save()
        parentModel.save()
      },

      add(model) {
        const parentModel = this.get('parentModel')
        const inverseRelationshipName = this.get('inverseRelationshipName')
        const recordName = this.get('recordName')

        if (this._inverseRelationshipKind(model) === 'belongsTo') {
          model.set(inverseRelationshipName, model)
        }

        if (this._inverseRelationshipKind(model) === 'hasMany') {
          model.get(inverseRelationshipName).pushObject(parentModel)
        }

        if (this.get('relationshipKind') === 'belongsTo') {
          parentModel.set(recordName, model)
        } else {
          parentModel.get(recordName).pushObject(model)
        }

        model.save()
        parentModel.save()
      }
    }
  }
)
