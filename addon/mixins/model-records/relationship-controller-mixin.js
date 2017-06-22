import Ember from 'ember'

const {
  Mixin,
  computed
} = Ember

export default Mixin.create({
  relationshipKind: computed('parentModel', function() {
    return this
      .get('parentModel')
      .relationshipFor(this.get('recordName'))
      .kind
  }),

  inverseRelationshipName: computed('recordName', 'parentModel', function() {
    return this.get('parentModel')
      .relationshipFor(this.get('recordName'))
      .options
      .inverse
  }),

  inverseRelationshipKind: computed('inverseRelationshipName', function() {
    const model = this.get('model')
    const inverse = this.get('inverseRelationshipName')
    return model.relationshipFor(inverse) &&
      model.relationshipFor(inverse).kind
  })
})
