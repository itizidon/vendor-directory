import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { css } from 'aphrodite'
import { gql, useQuery, useMutation } from '@apollo/client'
import Text from './lib/Text'
import customStyleSheet from './lib/customStyleSheet'
import evergreenIcon from './img/evergreen_icon.png'
import getImageUri from './utils/getImageUri'
import { v4 as uuidv4 } from 'uuid'
import TableRow from './TableRow'
import Filter from './Filter'

const GET_USER_QUERY = gql`
  query GetUser($id: Int!) {
    user(id: $id) {
      firstName
      lastName
      admin
    }
  }
`

const GET_ALL_VENDORS = gql`
  query {
    vendors {
      id
      name
      description
      category
      externalLink
      status
      risk
    }
  }
`

const styles = customStyleSheet(({ color, bp }) => ({
  logo: {
    height: 40,
    width: 40,
    marginRight: 2 * bp,
  },
  container: {
    backgroundColor: color.background,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const statuses = [
  { value: 1, label: 'active' },
  { value: 2, label: 'preferred' },
]

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: Int, $category: String, $admin: Boolean) {
    updateCategory(id: $id, category: $category, admin: $admin) {
      ok
    }
  }
`

const UPDATE_STATUS = gql`
  mutation UpdateStatus($id: Int, $status: Int, $admin: Boolean) {
    updateStatus(id: $id, status: $status, admin: $admin) {
      ok
    }
  }
`

function App() {
  const [categories, setCategories] = useState([])

  const [vendors, setVendors] = useState({})
  const [GET_VENDOR_QUERY, SET_GET_VENDOR_QUERY] = useState(`
  query {
    filter {
      id
      name
      description
      category
      externalLink
      status
      risk
    }
  }
`)

  const gotVendors = useQuery(
    gql`
      ${GET_VENDOR_QUERY}
    `
  ).data
  const gotAllVendors = useQuery(GET_ALL_VENDORS).data

  const [updateCategory] = useMutation(UPDATE_CATEGORY)
  const [updateStatus] = useMutation(UPDATE_STATUS)

  const { data } = useQuery(GET_USER_QUERY, {
    variables: {
      id: 1,
    },
  })

  useEffect(() => {
    if (gotAllVendors) {
      let allCategories = new Set()
      let unique = []
      for (const category of gotAllVendors.vendors) {
        if (!allCategories.has(category.category)) {
          allCategories.add(category.category)
          unique.push({ label: category.category, value: category.category })
        }
      }
      setCategories(unique)
    }
    if (gotVendors) {
      setVendors(gotVendors)
    }
  }, [gotVendors, gotAllVendors])

  const user = data && data.user
  const titleText = user
    ? `Welcome to Evergreen ${user.firstName} ${user.lastName}!`
    : 'Welcome to Evergreen!'

  const handleCategory = (e, cur, user, ind) => {
    updateCategory({
      variables: { id: cur.id, category: e.value, admin: user.admin },
    })
    const clone = []

    for (let [index, vendor] of vendors.filter.entries()) {
      if (index === ind) {
        let updatedVendor = {
          __typename: vendor.__typename,
          id: vendor.id,
          name: vendor.name,
          description: vendor.description,
          category: e.value,
          externalLink: vendor.externalLink,
          status: vendor.status,
          risk: vendor.risk,
        }
        clone.push(updatedVendor)
      } else {
        clone.push(vendor)
      }
    }
    const updatedVendors = { filter: clone }
    setVendors(updatedVendors)
  }

  const handleStatus = (e, cur, user, ind) => {
    updateStatus({
      variables: { id: cur.id, status: e.value, admin: user.admin },
    })

    const clone = []

    for (let [index, vendor] of vendors.filter.entries()) {
      if (index === ind) {
        let updatedVendor = {
          __typename: vendor.__typename,
          id: vendor.id,
          name: vendor.name,
          description: vendor.description,
          category: vendor.category,
          externalLink: vendor.externalLink,
          status: e.value,
          risk: vendor.risk,
        }
        clone.push(updatedVendor)
      } else {
        clone.push(vendor)
      }
    }
    const updatedVendors = { vendors: clone }
    setVendors(updatedVendors)
  }

  const handleSubmit = (e, category, status, risk, sort, search) => {
    let variables = ''
    let toggled = false

    if (status !== '') {
      variables = variables.concat(`status: ${status}, `)
      toggled = true
    }
    if (risk !== '') {
      variables = variables.concat(`risk: "${risk}", `)
      toggled = true
    }
    if (sort !== '') {
      variables = variables.concat(`sort: "${sort}"`)
      toggled = true
    }

    if (category.length > 0) {
      // JSON.stringify
      variables = variables.concat(`categories: ${JSON.stringify(category)}`)
      toggled = true
    }

    if (search !== '') {
      variables = variables.concat(`name: "${search}"`)
      toggled = true
    }

    if (toggled) {
      variables = '(' + variables + ')'
    }

    let newQuery = `
    query {
      filter${variables} {
        id
        name
        description
        category
        externalLink
        status
        risk
      }
    }
  `
    SET_GET_VENDOR_QUERY(newQuery)
  }

  return (
    <div className="container">
      <div className={css(styles.container)}>
        <img
          className={css(styles.logo)}
          src={getImageUri(evergreenIcon)}
          alt="logo"
        />
        <Text title1>{titleText}</Text>
      </div>
      <Filter categories={categories} handleSubmit={handleSubmit} />
      {vendors.filter ? (
          <CSVLink data={vendors.filter} asyncOnClick={true}>
            Download Data
          </CSVLink>
        ) : null}
      <div className="table-wrapper">
        <table id="customers">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th className="description">Description</th>
              <th className="category">Category</th>
              <th>External Link</th>
              <th>Status</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {vendors.filter
              ? vendors.filter.map((cur, ind) => {
                  return (
                    <TableRow
                      key={uuidv4()}
                      cur={cur}
                      ind={ind}
                      user={user}
                      handleCategory={handleCategory}
                      categories={categories}
                      statuses={statuses}
                      handleStatus={handleStatus}
                    />
                  )
                })
              : null}
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default App
