import Ember from 'ember'

const {
  Mixin
} = Ember

export default Mixin.create({
  relationshipKind(parentModel, relationshipName) {
    const relationship = parentModel.relationshipFor(relationshipName)
    return relationship && relationship.kind
  },

  inverseRelationshipName(parentModel, relationshipName) {
    const inverse = parentModel.inverseFor(relationshipName)
    return inverse && inverse.name
  },

  inverseRelationshipKind(parentModel, relationshipName) {
    const inverse = parentModel.inverseFor(relationshipName)
    return inverse && inverse.kind
  },

  relationshipInfo(parentModel) {
    const relationshipName = this.get('relationshipName')
    return {
      relationshipName,
      relationshipKind: this.relationshipKind(parentModel, relationshipName),
      inverseRelationshipName:
        this.inverseRelationshipName(parentModel, relationshipName),
      inverseRelationshipKind:
        this.inverseRelationshipKind(parentModel, relationshipName)
    }
  }
})
