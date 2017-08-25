import Ember from 'ember'
import HasManyQuery from 'ember-data-has-many-query'

const {
  Mixin
} = Ember
const {
  RESTAdapterMixin
} = HasManyQuery

export default Mixin.create(RESTAdapterMixin, {
  removeRelated(model, relationshipName, relatedModel) {
    const modelName = model.get('constructor.modelName')
    const url = this.urlForRemoveFromHasMany(
      model.get('id'),
      modelName,
      relationshipName
    )
    const relatedId = relatedModel.get('id')
    const relatedResourceType = this.pathForType(
      relatedModel.get('constructor.modelName')
    )
    return this.ajax(url, 'DELETE', {
      data: { data: [{ type: relatedResourceType, id: relatedId }] }
    })
  },
  urlForRemoveFromHasMany(id, modelName, relationshipName) {
    return `${this.urlForFindHasMany(id, modelName)}/${relationshipName}`
  },
  urlForFindHasMany(id, modelName) {
    return `${this._buildURL(modelName, id)}/relationships`
  }
})
