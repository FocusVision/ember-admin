import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe(
  'Integration | Component | admin fields/admin field boolean',
  () => {
    setupComponentTest('admin-fields/admin-field-boolean', {
      integration: true
    })
    it('renders', function() {
      this.render(hbs`{{admin-fields/admin-field-boolean}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
