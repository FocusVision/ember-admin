import Ember from 'ember'

const {
  Mixin,
  computed,
  inject: { service },
  A
} = Ember

const relationshipsFor = model => {
  const relationships = []

  model.get('constructor.relationshipsByName').forEach(relationship =>
    relationships.push(relationship))

  return A(relationships)
}

export default Mixin.create({
  admin: service(),

  relationships: computed('model', function() {
    return relationshipsFor(this.get('model'))
  }).volatile(),

  actions: {
    onFieldUpdate(key, value) {
      this.get('model').set(key, value)
    },

    save() {
      return this.get('model')
        .save()
        .then(() => this.transitionToRoute('admin.model-records'))
    },

    cancel() {
      this.transitionToRoute('admin.model-records')
    },

    delete() {
      const canDestroy = window
        .confirm('Are you sure you want to destroy this record?')

      if (canDestroy) {
        this.get('model')
          .destroyRecord()
          .then(() => this.transitionToRoute('admin.model-records'))
      }
    }
  }
})
