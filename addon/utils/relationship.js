export function relationshipKind(model, relationshipName) {
  const relationship = model.relationshipFor(relationshipName)
  return relationship && relationship.kind
}

export function inverseRelationshipName(model, relationshipName) {
  const inverse = model.inverseFor(relationshipName)
  return inverse && inverse.name
}

export function inverseRelationshipKind(model, relationshipName) {
  const inverse = model.inverseFor(relationshipName)
  return inverse && inverse.kind
}
