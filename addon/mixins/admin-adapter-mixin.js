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
    let verb
    let data
    if (kind === 'belongsTo') {
      verb = 'PATCH'
      data = null
    } else {
      verb = 'DELETE'
      data = [{
        type: this._payloadKeyFromModel(relatedModel),
        id: relatedModel.get('id')
      }]
    }

    return this.ajax(
      this.urlForRemoveFromHasMany(model, relationshipName),
      verb,
      { data: { data }}
    )
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
    let verb
    let data = {
      type: this._payloadKeyFromModel(relatedModel),
      id: relatedModel.get('id')
    }
    if (kind === 'belongsTo') {
      verb = 'PATCH'
    } else {
      verb = 'POST'
      data = [data]
    }

    return this.ajax(this.urlForAddToHasMany(model, relationshipName), verb, {
      data: { data }
    })
  }
})
