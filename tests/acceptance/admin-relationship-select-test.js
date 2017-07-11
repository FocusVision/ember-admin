import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import page from '../pages/model-index'

describe('Acceptance | admin relationship select', () => {
  let application

  beforeEach(() => {
    application = startApp()

    server.create('owner', { name: 'Bob Bobert' })
    server.create('cat', { name: 'Floofy' })
    server.create('cat', { name: 'Fluffy' })
    server.createList('cat', 8)
  })

  afterEach(() => {
    destroyApp(application)
  })

  it('can filter list with partial match', async () => {
    await page
      .visitOwnerCats({ owner_id: 1 })
      .clickAddRelatedCat()

    expect(page.relatedCatsSelectList().count).to.equal(10)

    await page
      .filterBy('fl')

    expect(page.relatedCatsSelectList().count).to.equal(2)
  })

  it('can filter list with full match', async () => {
    await page
      .visitOwnerCats({ owner_id: 1 })
      .clickAddRelatedCat()

    expect(page.relatedCatsSelectList().count).to.equal(10)

    await page
      .filterBy('fl')

    expect(page.relatedCatsSelectList().count).to.equal(2)
  })
})
