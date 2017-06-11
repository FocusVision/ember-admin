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

const relationshipsFor = (model, kind) => {
  const relationshipsForKind = []
  model.get('constructor.relationshipsByName').forEach((relationship, name) => {
    if (relationship.kind === kind) {
      relationshipsForKind.push(relationship)
    }
  })
  return A(relationshipsForKind)
}

export default Mixin.create({
  hasMany: computed('model', function() {
    return relationshipsFor(this.get('model'), 'hasMany')
  }),
  belongsTo: computed('model', function() {
    return relationshipsFor(this.get('model'), 'belongsTo')
  }),
})
