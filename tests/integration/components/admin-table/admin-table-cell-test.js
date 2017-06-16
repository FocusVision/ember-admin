import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin table/admin table cell', function() {
  setupComponentTest('admin-table/admin-table-cell', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-table/admin-table-cell}}
    //     template content
    //   {{/admin-table/admin-table-cell}}
    // `);

    this.render(hbs`{{admin-table/admin-table-cell}}`);
    expect(this.$()).to.have.length(1);
  });
});
