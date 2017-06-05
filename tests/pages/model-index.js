import {
  create,
  collection,
  visitable,
  text,
  clickable,
  fillable,
  count
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin'),
  visitCats: visitable('/admin/cat'),
  visitCatEdit: visitable('/admin/cat/:cat_id/edit'),
  visitCatNew: visitable('/admin/cat/new'),

  modelLinks: text('a', {
    multiple: true
  }),

  catHeaders: collection({
    itemScope: '.cat table thead',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      age: text('td', { at: 2 })
    }
  }),
  cats: collection({
    itemScope: '.cat table tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      age: text('td', { at: 2 })
    }
  }),

  owners: collection({
    itemScope: '.owner table tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 })
    }
  }),

  toys: collection({
    itemScope: '.toy table tbody tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 })
    }
  }),

  toyCount: count('tr', { scope: '.toy table tbody' }),

  filterBy: fillable('input[data-test=filter-input]'),
  fillInName: fillable('input[data-test=edit-input-name]'),
  fillInAge: fillable('input[data-test=edit-input-age]'),

  formLabelName: text('label[data-test=form-label-name]'),

  clickModelTypeCat: clickable('a[data-test=models-list-item-cat]'),
  clickFirstCatRecord: clickable('a[data-test=record-list-item]', {
    at: 0
  }),

  clickLastToyRecord: clickable('a[data-test=record-list-item]', {
    at: 2
  }),

  clickCreateToyRelationship: clickable('a[data-test=button-create-toy]'),

  clickSave: clickable('button[data-test=button-save]'),
  clickDelete: clickable('button[data-test=button-delete]'),
  clickCancel: clickable('button[data-test=button-cancel]'),
  clickCreate: clickable('a[data-test=button-create]')
});
