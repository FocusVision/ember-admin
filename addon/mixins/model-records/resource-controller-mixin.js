import Ember from 'ember'

const {
  Mixin,
  get,
  computed,
  computed: { alias },
  inject: { controller, service }
} = Ember

export default Mixin.create({
  admin: service(),

  recordType: computed('model', function() {
    return this.get('_recordType')
  }),

  actions: {
    onFieldUpdate(key, value) {
      this.get('model').set(key, value)
    },

    save() {
      return get(this, 'model')
        .save()
        .then(record => {
          this.transitionToRoute(
            'admin.model-records',
            record.constructor.modelName
          )
        })
    },

    cancel() {
      this.transitionToRoute(
        'admin.model-records',
        get(this, 'model').constructor.modelName
      )
    },

    delete() {
      const canDestroy = window
        .confirm('Are you sure you want to destroy this record?')

      if (canDestroy) {
        get(this, 'model')
          .delete()
          .then(record =>
            this.transitionToRoute(
              'admin.model-records',
              record.constructor.modelName
            )
          )
      }
    }
  }
})
