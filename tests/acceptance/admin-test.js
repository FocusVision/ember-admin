import Ember from 'ember'
import { describe, it, before, after, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import { visit, findAll } from 'ember-native-dom-helpers'
import {
  rowValuesEqual,
  inputPropertiesEqual
} from '../helpers/equality-helpers'
import Pretender from 'pretender'
import page from '../pages/model-index'

const {
  isEmpty,
  run
} = Ember

let App
let server

describe('Acceptance: Admin', () => {
  let application
  beforeEach(() => application = startApp())
  afterEach(() => destroyApp(application))

  before(() => {
    const cats = [
      { id: 1, name: 'Felix', age: 10 },
      { id: 2, name: 'Nyan', age: 3 }
    ]

    server = new Pretender(function() {
      this.get('/admin/cats', () =>
        [200, { 'Content-Type': 'application/json' }, JSON.stringify({ cats })]
      )

      this.get('/admin/cats/1', () => {
        const cat = { id: 1, name: 'Felix', age: 10 }

        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ cats: [cat] })
        ]
      })

      this.put('/admin/cats/1', () => {
        const cat = { id: 1, name: 'Hobbes', age: 29 }
        cats[0] = cat

        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ cats: [cat] })
        ]
      })

      this.post('/admin/cats', () => {
        const cat = { id: 3, name: 'Lion-O', age: 30 }
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ cats: [cat] })
        ]
      })

      this.delete('/admin/cats/1', () => {
        cats.splice(0, 1)
        return [
          204,
          { 'Content-Type': 'application/json' },
          ''
        ]
      })

      this.get('/admin/dogs', () => {
        const dogs = [
          { id: 1, name: 'Boomer', age: 2 }
        ]
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ dogs })
        ]
      })

      this.get('/admin/dogs/1', () => {
        const dogs = [
          { id: 1, name: 'Boomer', age: 2 }
        ]
        return [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({ dogs })
        ]
      })
    })
  })

  after(() => {
    server.shutdown()
  })


  it('listing all models', async () => {
    await page.visit()

    expect(page.modelLinks).to.include.members([
      'bird',
      'cat',
      'course',
      'dog',
      'owner',
      'toy'
    ])
  })

  it('viewing a model\'s records', async () => {
    await page.visit().clickModelTypeCat()

    const rows = $(findAll('.cat table tr'))
    rowValuesEqual(
      expect,
      rows.eq(0),
      'id', 'name', 'age', 'foo', 'bar', 'baz'
    )
    rowValuesEqual(expect, rows.eq(1), '1', 'Felix', '10', '', '', '')
    rowValuesEqual(expect, rows.eq(2), '2', 'Nyan', '3', '', '', '')
  })

  it('filtering records by value', async () => {
    await page.visitCats().filterBy('Felix')

    const rows = $(find('.cat table tr'))
    rowValuesEqual(
      expect,
      rows.eq(0),
      'id', 'name', 'age', 'foo', 'bar', 'baz'
    )
    rowValuesEqual(expect, rows.eq(1), '1', 'Felix', '10', '', '', '')
    expect(isEmpty(rows.eq(2))).to.be.true
  })

  it('editing a record', async () => {
    await page
      .visitCats()
      .clickFirstCatRecord()
      .fillInName('Hobbes')
      .fillInAge('29')
      .clickSave()

    const rows = $(find('.cat table tr'))
    rowValuesEqual(expect, rows.eq(1), '1', 'Hobbes', '29', '', '', '')
  })

  it('creating a new record', async () => {
    await page.visitCats()
      .clickCreate()
      .fillInName('Lion-O')
      .fillInAge(30)
      .clickSave()

    const rows = $(find('.cat table tr'))
    rowValuesEqual(expect, rows.eq(3), '3', 'Lion-O', '30', '', '', '')
  })

  it("creating doesn't affect list", async () => {
    const oldConfirm = window.confirm
    window.confirm = () => true

    await page.visitCats()

    const rows = findAll('.cat table tr')

    await  page.clickCreate().visitCats()

    const newRows = findAll('.cat table tr')


    expect(rows.length).to.equal(newRows.length) //Number of rows unaffected
    window.confirm = oldConfirm
  })

  it('deleting a record & confirming', async () => {
    let confirmCount = 0
    const oldConfirm = window.confirm
    window.confirm = () => {
      confirmCount += 1
      return true
    }

    await page.visitCatEdit({ cat_id: 1 }).clickDelete()

    expect(page.cats().count).to.equal(2)
    expect(page.cats().id, 2)
    expect(page.cats().name, 'Nyan')
    expect(page.cats().age, 3)
    expect(confirmCount).to.equal(1)
    window.confirm = oldConfirm
  })

  it('deleting a record & not confirming', async () => {
    const oldConfirm = window.confirm
    window.confirm = () => {
      return false
    }

    await page.visitCatEdit({ cat_id: 1 }).clickDelete()

    expect(currentURL()).to.equal('/admin/cat/1/edit')
    window.confirm = oldConfirm
  })

  it('canceling edit', async () => {
    await page.visitCatEdit({ cat_id: 1 }).clickCancel()

    expect(currentURL()).to.equal('/admin/cat')
  })

  it('canceling new', async () => {
    const oldConfirm = window.confirm
    window.confirm = () => true

    await page.visitCatNew().clickCancel()

    expect(currentURL()).to.equal('/admin/cat')
    window.confirm = oldConfirm
  })

  it('excluding models', async () => {
    const adminSettings = application.__container__.lookup('service:admin')
    adminSettings.set('excludedModels', ['cat'])

    await page.visit()

    expect(find('a[data-test=models-list-item-cat]')).to.have.length(0)
  })

  it('including models', async () => {
    const adminSettings = application.__container__.lookup('service:admin')
    adminSettings.set('includedModels', ['dog'])

    await page.visit()

    expect(find('a[data-test=models-list-item-cat]')).to.have.length(0)
  })

  it('including & excluding model', async () => {
    const adminSettings = application.__container__.lookup('service:admin')
    adminSettings.set('includedModels', ['cat', 'dog'])
    adminSettings.set('excludedModels', ['cat'])

    await page.visit()

    expect(find('a[data-test=models-list-item-cat]')).to.have.length(0)
  })

  it('including model columns', async () => {
    const adminSettings = application.__container__.lookup('service:admin')
    adminSettings.set('includedColumns', {
      cat: ['name']
    })

    await page.visitCats()

    expect(page.cats(1).id, 2)
    expect(page.cats(1).name, 'Nyan')

    await page.visitCatEdit({ cat_id: 1 })

    expect(page.formLabelName).to.equal('name')
  })

  it('excluding model columns', async () => {
    const adminSettings = application.__container__.lookup('service:admin')
    adminSettings.set('excludedColumns', {
      cat: ['name']
    })

    await page.visitCats()

    expect(page.cats(0).text.split(' ')).to.include.members(
      ['id', 'age', 'foo', 'bar', 'baz']
    )
    // TODO: fix after mirage is integrated
    // expect(page.cats(1).text.split(' ')).to.include.members(
    //   ['1', '10']
    // )
    expect(page.cats(1).text.split(' ')).to.include.members(
      ['2', '3']
    )
  })

  it('can override index template', () => {
    visit('/admin/dog')

    andThen(() => {
      expect(find('h3.index').text()).to.equal('Dogs Index')
    })
  })

  it('can override new template', () => {
    visit('/admin/dog/new')

    andThen(() => {
      expect(find('h3.new').text()).to.equal('Dogs New')
    })
  })

  it('can override edit template', () => {
    visit('/admin/dog/1/edit')

    andThen(() => {
      expect(find('h3.edit').text()).to.equal('Dogs Edit')
    })
  })
})
