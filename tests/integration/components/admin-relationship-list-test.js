import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin relationship list', function() {
  setupComponentTest('admin-relationship-list', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-relationship-list}}
    //     template content
    //   {{/admin-relationship-list}}
    // `);

    this.render(hbs`{{admin-relationship-list}}`);
    expect(this.$()).to.have.length(1);
  });
});
