import Ember from 'ember'
import RelationshipControllerMixin
  from 'ember-admin/mixins/model-records/relationship-controller-mixin'

const {
  Controller,
  computed: { alias },
  inject: { controller, service }
} = Ember

export default Controller.extend(
  RelationshipControllerMixin,
  {
    admin: service(),
    related: controller('admin.model-records.show.related'),

    parentModel: alias('related.parentModel'),
    recordName: alias('related.recordName'),
    recordType: alias('related.recordType'),

    actions: {
      onFilterChange(value) {
        this.get('admin.store').query(
          this.get('recordType'),
          { 'filter[keyword]': value })
          .then(result => this.set('model', result))
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
