export default function() {
  this.namespace = '/admin'

  this.get('/cats')
  this.post('/cats')
  this.get('/cats/:id')
  this.patch('/cats/:id', function({ cats }, { params: { id }}) {
    return cats.find(id).update(this.normalizedRequestAttrs())
  })
  this.delete('/cats/:id')

  this.get('/dogs')
  this.get('/dogs/:id')

  this.get('/birds')
  this.get('/birds/:id')

  this.get('/toys')
  this.get('/owners')
  this.get('/owners/:id')
  this.get('/courses')
}
