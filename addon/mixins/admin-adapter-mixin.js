import Ember from 'ember'
import HasManyQuery from 'ember-data-has-many-query'

const {
  Mixin
} = Ember
const {
  RESTAdapterMixin
} = HasManyQuery

export default Mixin.create(RESTAdapterMixin, {
  removeRelated(model, relationshipName, relatedModel, kind) {
    const url = this.urlForRemoveFromHasMany(model, relationshipName)
    const relatedId = relatedModel.get('id')
    const relatedResourceType = this._payloadKeyFromModel(relatedModel)
    let verb
    let data
    if (kind === 'belongsTo') {
      verb = 'PATCH'
      data = null
    } else {
      verb = 'DELETE'
      data = [{ type: relatedResourceType, id: relatedId }]
    }

    return this.ajax(url, verb, {
      data: { data }
    })
  },
  urlForAddToHasMany(...args) {
    return this._urlForRelationship(...args)
  },
  urlForRemoveFromHasMany(...args) {
    return this._urlForRelationship(...args)
  },
  urlForRelationships(id, modelName) {
    return `${this._buildURL(modelName, id)}/relationships`
  },
  _urlForRelationship(model, relationshipName) {
    const modelName = model.get('constructor.modelName')
    const id = model.get('id')
    const store = model.get('store')
    return `${this.urlForRelationships(id, modelName)}/` +
      `${store.serializerFor(modelName).keyForRelationship(relationshipName)}`
  },
  _payloadKeyFromModel(model) {
    const modelName = model.constructor.modelName
    return model
      .store
      .serializerFor(modelName)
      .payloadKeyFromModelName(modelName)
  },
  addRelated(model, relationshipName, relatedModel, kind) {
    const url = this.urlForAddToHasMany(model, relationshipName)
    const relatedId = relatedModel.get('id')
    const relatedResourceType = this._payloadKeyFromModel(relatedModel)
    let verb
    let data = { type: relatedResourceType, id: relatedId }
    if (kind === 'belongsTo') {
      verb = 'PATCH'
    } else {
      verb = 'POST'
      data = [data]
    }

    return this.ajax(url, verb, {
      data: { data }
    })
  }
})
