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
    return model.where({ name: keyword })
  }
  return model.all()
}

const getCats = ({ cats }, ...args) => getResources(cats, ...args)
const getToys = ({ toys }, ...args) => getResources(toys, ...args)

export default function() {
  this.namespace = '/admin'

  this.get('/cats', getCats)
  this.get('/cats/:id')
  this.post('/cats')
  this.patch('/cats/:id', patch)
  this.delete('/cats/:id')

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

  this.get('/owners')
  this.get('/owners/:id')
  this.post('/owners')
  this.patch('/owners/:id', patch)
  this.delete('/owners/:id')

  this.get('/courses')
  this.get('/courses/:id')
  this.post('/courses')
  this.patch('/courses/:id', patch)
  this.delete('/courses/:id')
}
