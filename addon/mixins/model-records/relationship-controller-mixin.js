import Ember from 'ember'

const {
  Mixin
} = Ember

export default Mixin.create({
  relationshipKind(parentModel, recordName) {
    const relationship = parentModel.relationshipFor(recordName)
    return relationship && relationship.kind
  },

  inverseRelationshipName(parentModel, recordName) {
    const inverse = parentModel.inverseFor(recordName)
    return inverse && inverse.name
  },

  inverseRelationshipKind(parentModel, recordName) {
    const inverse = parentModel.inverseFor(recordName)
    return inverse && inverse.kind
  }
})
