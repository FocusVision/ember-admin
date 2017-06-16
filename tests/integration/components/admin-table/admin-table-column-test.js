import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin table/admin table column', function() {
  setupComponentTest('admin-table/admin-table-column', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-table/admin-table-column}}
    //     template content
    //   {{/admin-table/admin-table-column}}
    // `);

    this.render(hbs`{{admin-table/admin-table-column}}`);
    expect(this.$()).to.have.length(1);
  });
});
