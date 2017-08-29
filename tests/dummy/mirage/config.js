import Mirage from 'ember-cli-mirage'

const jsonapiType = request => JSON.parse(request.requestBody).data.type

const patch = function(schema, request) {
  const { params: { id }} = request

  return schema[jsonapiType(request)]
    .find(id)
    .update(this.normalizedRequestAttrs())
}

const getResources = (model, { queryParams }) => {
  const keyword = queryParams['filter[keyword]']

  if (keyword) {
    const collection = model.all()

    return collection.filter(record => {
      if (!record.name) {
        return false
      }

      return record.name.toLowerCase().includes(
        keyword.toLowerCase()
      )
    })
  }

  return model.all()
}

const getCats = ({ cats }, ...args) => getResources(cats, ...args)
const getToys = ({ toys }, ...args) => getResources(toys, ...args)
const getOwners = ({ owners }, ...args) => getResources(owners, ...args)

const _relationshipIds = ({ requestBody }) =>
  JSON.parse(requestBody).data.map(({ id }) => id)
const _relationshipId = ({ requestBody }) =>
  (JSON.parse(requestBody).data || {}).id

const replaceBelongsTo =
  (modelName, relationship, relatedType = relationship) =>
  (schema, request) => {
    const { params: { id }} = request
    const relationshipId = _relationshipId(request)
    const model = schema[modelName].find(id)
    model[relationship] = relationshipId ?
      schema[relatedType].find(relationshipId) : null
    return new Mirage.Response(204)
  }
const addToHasMany =
  (modelName, relationship, relatedType = relationship) =>
  (schema, request) => {
    const { params: { id }} = request
    const ids = _relationshipIds(request)
    const model = schema[modelName].find(id)
    model[relationship].mergeCollection(schema[relatedType].find(ids))
    return new Mirage.Response(204)
  }
const removeFromHasMany =
  (modelName, relationship) =>
  (schema, request) => {
    const { params: { id }} = request
    const ids = _relationshipIds(request)
    const model = schema[modelName].find(id)
    model[relationship] = model[relationship].filter(id => !ids.includes(id))
    return new Mirage.Response(204)
  }

export default function() {
  this.namespace = '/admin'

  this.get('/cats', getCats)
  this.get('/cats/:id')
  this.post('/cats')
  this.patch('/cats/:id', patch)
  this.delete('/cats/:id')
  this.patch(
    '/cats/:id/relationships/owner',
    replaceBelongsTo('cats', 'owner', 'owners')
  )
  this.post('/cats/:id/relationships/toys', addToHasMany('cats', 'toys'))
  this.delete('/cats/:id/relationships/toys', removeFromHasMany('cats', 'toys'))

  this.get('/dogs')
  this.get('/dogs/:id')
  this.post('/dogs')
  this.patch('/dogs/:id', patch)
  this.delete('/dogs/:id')

  this.get('/birds')
  this.get('/birds/:id')
  this.post('/birds')
  this.patch('/birds/:id', patch)
  this.delete('/birds/:id')

  this.get('/toys', getToys)
  this.get('/toys/:id')
  this.post('/toys')
  this.patch('/toys/:id', patch)
  this.delete('/toys/:id')
  this.patch(
    '/toys/:id/relationships/cat',
    replaceBelongsTo('toys', 'cat', 'cats')
  )

  this.get('/owners', getOwners)
  this.get('/owners/:id')
  this.post('/owners')
  this.patch('/owners/:id', patch)
  this.delete('/owners/:id')
  this.post(
    '/owners/:id/relationships/courses',
    addToHasMany('owners', 'courses')
  )
  this.delete(
    '/owners/:id/relationships/courses',
    removeFromHasMany('owners', 'courses')
  )
  this.patch(
    '/owners/:id/relationships/profile',
    replaceBelongsTo('owners', 'profile', 'profiles')
  )

  this.get('/courses')
  this.get('/courses/:id')
  this.post('/courses')
  this.patch('/courses/:id', patch)
  this.delete('/courses/:id')

  this.get('/profiles')
  this.get('/profiles/:id')
  this.post('/profiles')
  this.patch('/profiles/:id', patch)
  this.delete('/profiles/:id')
}
