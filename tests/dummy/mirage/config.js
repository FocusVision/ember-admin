const jsonapiType = request => JSON.parse(request.requestBody).data.type
const patch = function(schema, request) {
  const { params: { id }} = request
  return schema[jsonapiType(request)]
    .find(id)
    .update(this.normalizedRequestAttrs())
}

export default function() {
  this.namespace = '/admin'

  this.get('/cats')
  this.post('/cats')
  this.get('/cats/:id')
  this.patch('/cats/:id', patch)
  this.delete('/cats/:id')

  this.get('/dogs')
  this.post('/dogs')
  this.get('/dogs/:id')

  this.get('/birds')
  this.post('/birds')
  this.get('/birds/:id')

  this.get('/toys')
  this.post('/toys')
  this.get('/toys/:id')

  this.get('/owners')
  this.post('/owners')
  this.get('/owners/:id')

  this.get('/courses')
  this.post('/courses')
  this.get('/courses/:id')
}
