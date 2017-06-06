export { rowValuesEqual, inputPropertiesEqual }

function rowValuesEqual(expect, row, ...args) {
  const values = args
  const columns = row.find('th, td')

  expect(columns.length).to.equal(values.length)

  for (let i = 0; i < columns.length; i++) {
    const columnText = columns.eq(i).text().trim()
    expect(columnText).to.equal(values[i])
  }
}

function inputPropertiesEqual(expect, inputs, ...args) {
  const values = args

  expect(inputs.length).to.equal(values.length)

  for (let i = 0; i < inputs.length; i++) {
    const labelText = inputs.eq(i).parent().text().trim()
    expect(labelText).to.equal(values[i])
  }
}
