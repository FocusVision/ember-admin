import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin layout/relationship header', () => {
  setupComponentTest('admin-layout/relationship-header', {
    integration: true
  })
  it('renders', function() {
    this.render(hbs`{{admin-layout/relationship-header}}`)
    expect(this.$()).to.have.length(1)
  })
})
