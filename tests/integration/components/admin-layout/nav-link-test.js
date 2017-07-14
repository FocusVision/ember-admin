import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin layout/nav link', () => {
  setupComponentTest('admin-layout/nav-link', {
    integration: true
  })

  it('is plural and caplitalized', function() {
    this.set('name', 'mouse')

    this.render(hbs`
      {{admin-layout/nav-link name=name}}
    `)

    expect(this.$().text().trim()).to.equal('Mice')
  })
})
