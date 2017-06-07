import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import page from '../pages/model-index'

describe('Acceptance: Admin', () => {
  let application

  beforeEach(() => {
    application = startApp()
    server.create('cat', { name: 'Felix', age: 10 })
    server.create('cat', { name: 'Nyan', age: 3 })
  })
  afterEach(() => destroyApp(application))

  it('listing all models', async () => {
    await page.visit()

    expect(page.modelLinks).to.include.members(
      ['bird', 'cat', 'course', 'dog', 'owner', 'toy']
    )
  })

  it('viewing a model\'s records', async () => {
    await page.visit().clickModelTypeCat()

    expect(page.catHeaders(0).text.split(' ')).to.include.members(
      ['id', 'name', 'age', 'foo', 'bar', 'baz']
    )
    expect(page.cats(0).text.split(' ')).to.include.members(
      ['Felix', '10']
    )
    expect(page.cats(1).text.split(' ')).to.include.members(
      ['Nyan', '3']
    )
  })

  it('filtering records by value', async () => {
    await page.visitCats().filterBy('Felix')

    expect(page.cats().count).to.equal(1)
    expect(page.cats(0).text.split(' ')).to.include.members(
      ['Felix', '10']
    )
  })

  it('editing a record', async () => {
    await page
      .visitCats()
      .clickFirstCatRecord()
      .fillInName('Hobbes')
      .fillInAge('29')
      .clickSave()

    expect(page.cats().count).to.equal(2)
    expect(page.cats(0).text.split(' ')).to.include.members(
      ['Hobbes', '29']
    )
  })

  it('creating a new record', async () => {
    await page.visitCats()
      .clickCreate()
      .fillInName('Lion-O')
      .fillInAge(30)
      .clickSave()

    expect(page.cats().count).to.equal(3)
    expect(page.cats(2).text.split(' ')).to.include.members(
      ['Lion-O', '30']
    )
  })

  it("creating doesn't affect list", async () => {
    const oldConfirm = window.confirm
    window.confirm = () => true

    await page.visitCats()

    expect(page.cats().count).to.equal(2)

    await page.clickCreate().visitCats()

    expect(page.cats().count).to.equal(2)
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

    expect(page.cats().count).to.equal(1)
    expect(page.cats(0).text.split(' ')).to.include.members(['Nyan', '3'])
    expect(confirmCount).to.equal(1)
    window.confirm = oldConfirm
  })

  it('deleting a record & not confirming', async () => {
    const oldConfirm = window.confirm
    window.confirm = () => false

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

    expect(page.modelLinks).to.have.length(5)
    expect(page.modelLinks).to.not.include('cat')
  })

  it('including models', async () => {
    const adminSettings = application.__container__.lookup('service:admin')
    adminSettings.set('includedModels', ['dog'])

    await page.visit()

    expect(page.modelLinks).to.have.length(1)
    expect(page.modelLinks).to.include('dog')
  })

  it('including & excluding model', async () => {
    const adminSettings = application.__container__.lookup('service:admin')
    adminSettings.set('includedModels', ['cat', 'dog'])
    adminSettings.set('excludedModels', ['cat'])

    await page.visit()

    expect(page.modelLinks).to.have.length(1)
    expect(page.modelLinks).to.include('dog')
  })

  it('including model columns', async () => {
    const adminSettings = application.__container__.lookup('service:admin')
    adminSettings.set('includedColumns', {
      cat: ['name']
    })

    await page.visitCats()

    expect(page.catHeaders().text.split(' ')).to.include.members(
      ['id', 'name']
    )

    await page.visitCatEdit({ cat_id: 1 })

    expect(page.formLabelName).to.equal('name')
  })

  it('excluding model columns', async () => {
    const adminSettings = application.__container__.lookup('service:admin')
    adminSettings.set('excludedColumns', {
      cat: ['name']
    })

    await page.visitCats()

    expect(page.catHeaders().text.split(' ')).to.include.members(
      ['id', 'age', 'foo', 'bar', 'baz']
    )
  })

  it('can override index template', async () => {
    server.create('dog')

    await page.visitDogs()

    expect(find('h3.index').text()).to.equal('Dogs Index')
  })

  it('can override new template', async () => {
    await page.visitDogsNew()

    expect(find('h3.new').text()).to.equal('Dogs New')
  })

  it('can override edit template', async () => {
    server.create('dog')

    await page.visitDogsEdit({ dog_id: 1 })

    expect(find('h3.edit').text()).to.equal('Dogs Edit')
  })

  describe('pagination', () => {
    it('shows paginator on index page', async () => {
      await page.visitCats()

      expect(page.paginatorIsVisible).to.be.true
      expect(page.paginatorPages().count).to.eq(1)
    })

    it('paginator modifies query params', async () => {
      server.createList('cat', 31)

      await page
        .visitCats()
        .paginatorPages(2)
        .click()

      expect(page.paginatorIsVisible).to.be.true
      expect(page.paginatorPages().count).to.eq(3)
      expect(currentURL()).to.eq('/admin/cat?page=2')
    })
  })
})
