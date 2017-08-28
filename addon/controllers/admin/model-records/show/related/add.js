import Ember from 'ember'
import RelationshipControllerMixin
  from 'ember-admin/mixins/model-records/relationship-controller-mixin'
import IndexControllerMixin
  from 'ember-admin/mixins/model-records/index-controller-mixin'

const {
  Controller,
  inject: { service }
} = Ember

export default Controller.extend(
  RelationshipControllerMixin,
  IndexControllerMixin,
  {
    admin: service(),
    actions: {
      onFilterChange(value) {
        this.get('admin.store')
          .query(this.get('recordType'), { 'filter[keyword]': value })
          .then(result => this.set('model', result))
      },

      add(model, parentModel) {
        const {
          inverseKind,
          inverseRelationshipName,
          kind,
          relationshipName
        } = this.relationshipInfo(parentModel)

        parentModel.addRelated(relationshipName, model, kind).then(() => {
          if (kind === 'belongsTo') {
            parentModel.set(relationshipName, model)
          } else {
            parentModel.get(relationshipName).pushObject(model)
          }

          if (inverseKind === 'belongsTo') {
            model.set(inverseRelationshipName, model)
          } else if (inverseKind) {
            model.get(inverseRelationshipName).pushObject(parentModel)
          }
        })
      },

      complete() {
        this.transitionToRoute('admin.model-records.show.related')
      }
    }
  }
)
