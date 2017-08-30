import Ember from 'ember'
import IndexControllerMixin
  from 'ember-admin/mixins/model-records/index-controller-mixin'

const {
  Controller,
  inject: { service }
} = Ember

export default Controller.extend(IndexControllerMixin, {
  admin: service(),
  actions: {
    onFilterChange(value) {
      this.get('admin.store')
        .query(this.get('recordType'), { 'filter[keyword]': value })
        .then(result => this.set('model', result))
    },

    add(model, parentModel) {
      parentModel.addRelated(this.get('relationshipName'), model)
    },

    complete() {
      this.transitionToRoute('admin.model-records.show.related')
    }
  }
})
