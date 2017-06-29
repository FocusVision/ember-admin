import Ember from 'ember'
import RelationshipControllerMixin
  from 'ember-admin/mixins/model-records/relationship-controller-mixin'

const {
  Controller,
  computed: { alias },
  inject: { controller }
} = Ember

export default Controller.extend(RelationshipControllerMixin, {
  index: controller('admin.model-records.show.related.index'),

  parentModel: alias('index.parentModel'),
  recordName: alias('index.recordName'),
  recordType: alias('index.recordType'),

  actions: {
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
})
