import Ember from 'ember'
import RelationshipControllerMixin
  from 'ember-admin/mixins/model-records/relationship-controller-mixin'
import IndexControllerMixin
  from 'ember-admin/mixins/model-records/index-controller-mixin'

const {
  Controller,
  computed: { alias },
  inject: { controller, service }
} = Ember

export default Controller.extend(
  RelationshipControllerMixin,
  IndexControllerMixin,
  {
    admin: service(),
    related: controller('admin.model-records.show.related.index'),

    parentModel: alias('related.parentModel'),
    recordName: alias('related.recordName'),
    recordType: alias('related.recordType'),

    actions: {
      onFilterChange(value) {
        this.get('admin.store')
          .query(this.get('recordType'), { 'filter[keyword]': value })
          .then(result => this.set('model', result))
      },

      add(model, parentModel) {
        const recordName = this.get('recordName')
        const inverseRelationshipName =
          this.inverseRelationshipName(parentModel, recordName)
        const kind = this.relationshipKind(parentModel, recordName)
        const inverseKind =
          this.inverseRelationshipKind(parentModel, recordName)

        parentModel.addRelated(recordName, model).then(() => {
          if (kind === 'belongsTo') {
            parentModel.set(recordName, model)
          } else {
            parentModel.get(recordName).pushObject(model)
          }

          if (inverseKind === 'belongsTo') {
            model.set(inverseRelationshipName, model)
          } else {
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
