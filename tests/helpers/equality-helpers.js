export { rowValuesEqual, inputPropertiesEqual }

function rowValuesEqual(...args) {
  const [expect, row] = [...args]
  const values = [...args].slice(2, [...args].length)
  const columns = row.find('th, td')

  expect(columns.length).to.equal(values.length)
  // `expected ${values.length} columns: (${values.join(', ')})`

  for (let i = 0; i < columns.length; i++) {
    const columnText = columns.eq(i).text().trim()
    expect(columnText).to.equal(values[i])
    // `expected column(${(i + 1)}) with value: ${values[i]}`
  }
}

function inputPropertiesEqual(...args) {
  const [expect, inputs] = [...args]
  const values = [...args].slice(2, [...args].length)

  expect(inputs.length).to.equal(values.length)
  // `expected ${values.length} inputs: (${values.join(', ')})`

  for (let i = 0; i < inputs.length; i++) {
    const labelText = inputs.eq(i).parent().text().trim()

    expect(labelText).to.equal(values[i])
    // `expected input(${(i + 1)}) for property: ${values[i]}`
  }
}
