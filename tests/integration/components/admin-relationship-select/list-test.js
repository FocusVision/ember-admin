import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin relationship select/list', function() {
  setupComponentTest('admin-relationship-select/list', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-relationship-select/list}}
    //     template content
    //   {{/admin-relationship-select/list}}
    // `);

    this.render(hbs`{{admin-relationship-select/list}}`);
    expect(this.$()).to.have.length(1);
  });
});
