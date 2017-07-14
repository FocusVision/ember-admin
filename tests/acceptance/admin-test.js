import { context, describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import page from '../pages/model-index'

describe('Acceptance: Admin', () => {
  let application

  beforeEach(() => {
    application = startApp()
    server.create('cat', { name: 'Felix', age: 10, fleas: false })
    server.create('cat', { name: 'Nyan', age: 3, fleas: true })
  })
  afterEach(() => destroyApp(application))

  context('models index', () => {
    it('listing all models', async () => {
      await page.visit()

      expect(page.modelLinks).to.include.members(
        ['Profiles', 'Birds', 'Cats', 'Courses', 'Dogs', 'Owners', 'Toys']
      )
    })
  })

  context('records index', () => {
    it('viewing a model\'s records', async () => {
      await page.visit().clickModelTypeCat()

      expect(page.catHeaders(0).text.split(' ')).to.include.members(
        ['Id', 'Name', 'Age', 'Fleas', 'Bar', 'Baz']
      )
      expect(page.catsList(0).text.split(' ')).to.include.members(
        ['Felix', '10', 'false']
      )
      expect(page.catsList(1).text.split(' ')).to.include.members(
        ['Nyan', '3', 'true']
      )
    })

    it('filtering records by value', async () => {
      await page.visitCats().filterBy('Felix')

      expect(page.catsList().count).to.equal(1)
      expect(page.catsList(0).text.split(' ')).to.include.members(
        ['Felix', '10', 'false']
      )
    })
  })

  context('edit', () => {
    it('editing a record', async () => {
      await page
        .visitCats()
        .catsList(0)
        .click()

      await page
        .fillInName('Hobbes')
        .fillInAge('29')
        .clickFleas()
        .clickSave()

      expect(page.catsList().count).to.equal(2)
      expect(page.catsList(0).text.split(' ')).to.include.members(
        ['Hobbes', '29', 'true']
      )
    })

    it('canceling edit', async () => {
      await page
        .visitCatEdit({ cat_id: 1 })
        .clickCancel()

      expect(currentURL()).to.equal('/admin/cat')
    })
  })

  context('new', () => {
    it('creating a new record', async () => {
      await page.visitCats()
        .clickCreate()
        .fillInName('Lion-O')
        .fillInAge(30)
        .clickFleas('true')
        .clickSave()

      expect(page.catsList().count).to.equal(3)
      expect(page.catsList(2).text.split(' ')).to.include.members(
        ['Lion-O', '30', 'true']
      )
    })

    it('setting boolean to false remains false', async () => {
      await page.visitCats()
        .clickCreate()
        .clickSave()

      expect(page.catsList().count).to.equal(3)
      expect(page.catsList(2).text.split(' ')).to.include.members(
        ['false']
      )
    })

    it("creating doesn't affect list", async () => {
      const oldConfirm = window.confirm
      window.confirm = () => true

      await page.visitCats()

      expect(page.catsList().count).to.equal(2)

      await page.clickCreate().visitCats()

      expect(page.catsList().count).to.equal(2)
      window.confirm = oldConfirm
    })

    it('canceling new', async () => {
      const oldConfirm = window.confirm
      window.confirm = () => true

      await page.visitCatNew().clickCancel()

      expect(currentURL()).to.equal('/admin/cat')
      window.confirm = oldConfirm
    })
  })

  context('delete', () => {
    it('deleting a record & confirming', async () => {
      let confirmCount = 0
      const oldConfirm = window.confirm
      window.confirm = () => {
        confirmCount += 1
        return true
      }

      await page.visitCatEdit({ cat_id: 1 }).clickDelete()

      expect(page.catsList().count).to.equal(1)
      expect(page.catsList(0).text.split(' ')).to.include.members(['Nyan', '3'])
      expect(confirmCount).to.equal(1)
      window.confirm = oldConfirm
    })

    it('deleting a record & not confirming', async () => {
      const oldConfirm = window.confirm
      window.confirm = () => false

      await page.visitCatEdit({ cat_id: 1 }).clickDelete()

      expect(currentURL()).to.equal('/admin/cat/1/toys')
      window.confirm = oldConfirm
    })
  })

  context('inclusion/exlusion', () => {
    it('excluding models', async () => {
      const adminSettings = application.__container__.lookup('service:admin')
      adminSettings.set('excludedModels', ['cat'])

      await page.visit()

      expect(page.modelLinks).to.have.length(6)
      expect(page.modelLinks).to.not.include('Cats')
    })

    it('including models', async () => {
      const adminSettings = application.__container__.lookup('service:admin')
      adminSettings.set('includedModels', ['dog'])

      await page.visit()

      expect(page.modelLinks).to.have.length(1)
      expect(page.modelLinks).to.include('Dogs')
    })

    it('including & excluding model', async () => {
      const adminSettings = application.__container__.lookup('service:admin')
      adminSettings.set('includedModels', ['cat', 'dog'])
      adminSettings.set('excludedModels', ['cat'])

      await page.visit()

      expect(page.modelLinks).to.have.length(1)
      expect(page.modelLinks).to.include('Dogs')
    })

    it('including model columns', async () => {
      const adminSettings = application.__container__.lookup('service:admin')
      adminSettings.set('includedColumns', {
        cat: ['name']
      })

      await page.visitCats()

      expect(page.catHeaders().text.split(' ')).to.include.members(
        ['Name']
      )

      await page.visitCatEdit({ cat_id: 1 })

      expect(page.formLabelName).to.equal('Name')
    })

    it('excluding model columns', async () => {
      const adminSettings = application.__container__.lookup('service:admin')
      adminSettings.set('excludedColumns', {
        cat: ['name']
      })

      await page.visitCats()

      expect(page.catHeaders().text.split(' ')).to.include.members(
        ['Id', 'Age', 'Fleas', 'Bar', 'Baz']
      )
    })
  })

  describe('pagination', () => {
    it('shows paginator on index page', async () => {
      await page.visitCats()

      expect(page.paginatorCount).to.equal('1 of 1')
    })

    it('paginator modifies query params', async () => {
      server.createList('cat', 31)

      await page
        .visitCats()
        .paginator(0)
        .next()

      expect(page.paginatorCount).to.eq('2 of 2')
      expect(currentURL()).to.eq('/admin/cat?page=2')
    })
  })
})
