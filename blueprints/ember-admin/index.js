/* eslint-env node */
module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonsToProject({
      packages: [
        'ember-crumbly@1.0.7'
      ]
    })
  }
}
