import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe(
  'Integration | Component | admin fields/admin field string',
  () => {
    setupComponentTest('admin-fields/admin-field-string', {
      integration: true
    })
    it('renders', function() {
      this.render(hbs`{{admin-fields/admin-field-string}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
