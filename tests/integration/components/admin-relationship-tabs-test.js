import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin relationship tabs', () => {
  setupComponentTest('admin-relationship-tabs', {
    integration: true
  })
  it('renders', function() {
    this.render(hbs`{{admin-relationship-tabs}}`)
    expect(this.$()).to.have.length(1)
  })
})
