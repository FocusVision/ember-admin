import { JSONAPISerializer } from 'ember-cli-mirage'

export default JSONAPISerializer.extend({
  serialize(...args) {
    const json = JSONAPISerializer.prototype.serialize.apply(this, args)

    if (Array.isArray(json.data)) {
      json.meta = { 'page-count': Math.ceil(json.data.length / 30) }
    }

    return json
  }
})
