import Ember from 'ember'

const {
  Mixin,
  get,
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
      return get(this, 'model')
        .save()
        .then(record => {
          this.transitionToRoute('admin.model-records')
        })
    },

    cancel() {
      this.transitionToRoute('admin.model-records')
    },

    delete() {
      const canDestroy = window
        .confirm('Are you sure you want to destroy this record?')

      if (canDestroy) {
        get(this, 'model')
          .destroyRecord()
          .then(record => this.transitionToRoute('admin.model-records'))
      }
    }
  }
})
