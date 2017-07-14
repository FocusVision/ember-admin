import { Model, belongsTo } from 'ember-cli-mirage'

export default Model.extend({
  cat: belongsTo('cat', { inverse: 'toys' })
})
