export default function(router) {
  router.route('admin', { resetNamespace: true }, function() {
    this.route(
      'model-records',
      { path: ':name' },
      function() {
        this.route('show', { path: ':id' }, function() {
          this.route('edit')
          this.route('related', { path: ':relationship_name' }, function() {
            this.route('new')
          })
        })
        this.route('new')
      }
    )
  })
}
