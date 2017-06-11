import Ember from 'ember'
import { pushObject } from 'ember-admin/utils/array'

const {
  get,
  computed,
  isArray,
  getOwner,
  Mixin,
  A
} = Ember

const relationshipsFor = (model) => {
  const relationships = []
  model.get('constructor.relationshipsByName').forEach((relationship) => {
    relationships.push(relationship)
  })
  return A(relationships)
}

export default Mixin.create({
  relationships: computed('model', function() {
    return relationshipsFor(this.get('model'))
  }).volatile()
})
