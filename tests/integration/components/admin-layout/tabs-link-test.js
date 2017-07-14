import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin layout/tabs link', () => {
  setupComponentTest('admin-layout/tabs-link', {
    integration: true
  })
  it('renders', function() {
    this.render(hbs`{{admin-layout/tabs-link}}`)
    expect(this.$()).to.have.length(1)
  })
})
