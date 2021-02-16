import React, { useState } from 'react'
import Select from 'react-select'

const statusOptions = [
  { label: 'active', value: 1 },
  { label: 'preferred', value: 2 },
]

const riskOptions = [
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' },
]

const sortOptions = [
  { label: 'Name', value: 'name' },
  { label: 'Risk', value: 'risk' },
  { label: 'Status', value: 'status' },
]

const Filter = ({ categories, handleSubmit }) => {
  const [category, setCategory] = useState([])
  const [status, setStatus] = useState('')
  const [risk, setRisk] = useState('')
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(e, category, status, risk, sort, search)
        }}
        className="filter-form"
      >
        <label>
          Categories:
          <Select
            id="select"
            isMulti
            options={categories}
            onChange={(e) => {
              if (e) {
                let newCategories = []
                for (let cats of e) {
                  newCategories.push(cats.value)
                }

                setCategory(newCategories)
              } else {
                setCategory([])
              }
            }}
          />
        </label>
        <label>
          Status:
          <Select
            id="select"
            options={statusOptions}
            onChange={(e) => {
              setStatus(e.value)
            }}
          />
        </label>
        <label>
          Risk:
          <Select
            id="select"
            options={riskOptions}
            onChange={(e) => {
              setRisk(e.value)
            }}
          />
        </label>
        <label>
          Order by:
          <Select
            id="select"
            options={sortOptions}
            onChange={(e) => {
              setSort(e.value)
            }}
          />
        </label>
        <label>
          Search by name:
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
        </label>

        <input id="apply" type="submit" value="Apply" />
      </form>
    </div>
  )
}

export default Filter
