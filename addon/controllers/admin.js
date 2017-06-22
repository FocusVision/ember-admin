import Ember from 'ember'
import { includes } from 'ember-admin/utils/array'

const {
  computed,
  Controller,
  inject: { service }
} = Ember

export default Controller.extend({
  admin: service(),

  filteredModels: computed(function() {
    const { includedModels, excludedModels } = this.get('admin')
    const models = this.get('model')

    if (includedModels) {
      return models.filter(item => includes(includedModels, item) &&
        !includes(excludedModels, item))
    } else if (excludedModels) {
      return models.filter(item => !includes(excludedModels, item))
    }

    return models
  })
})
