import { Model, hasMany } from 'ember-cli-mirage'

export default Model.extend({
  owners: hasMany('owner', { inverse: 'courses' })
})
