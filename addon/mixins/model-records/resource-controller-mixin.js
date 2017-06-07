import Ember from 'ember'

const {
  Mixin,
  get,
  computed: { alias },
  inject: { controller }
} = Ember

export default Mixin.create({
  modelRecords: controller('model-records'),
  recordType: alias('modelRecords.recordType'),

  actions: {
    save() {
      return get(this, 'model')
        .save()
        .then(record => {
          this.transitionToRoute(
            'model-records',
            record.constructor.modelName
          )
        })
    },

    cancel() {
      this.transitionToRoute(
        'model-records',
        get(this, 'model').constructor.modelName
      )
    },

    destroyRecord() {
      const canDestroy = window
        .confirm('Are you sure you want to destroy this record?')

      if (canDestroy) {
        get(this, 'model')
          .destroyRecord()
          .then(record =>
            this.transitionToRoute(
              'model-records',
              record.constructor.modelName
            )
          )
      }
    }
  }
})
