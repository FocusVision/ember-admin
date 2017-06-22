import Ember from 'ember'

const {
  Mixin,
  inject: { service }
} = Ember

export default Mixin.create({
  admin: service(),

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
