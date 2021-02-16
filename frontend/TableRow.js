import React, { useState } from 'react'
import Select from 'react-select'

const TableRow = ({ handleCategory, ind, user, cur, categories, statuses, handleStatus }) => {
  return (
    <tr>
      <td>{ind + 1}</td>
      <td>{cur.name}</td>
      <td>{cur.description}</td>
      <td>
        <Select
          options={categories}
          value={{ value: cur.category, label: cur.category }}
          onChange={(e) => {
            handleCategory(e, cur, user, ind)
          }}
        />
      </td>
      <td>{cur.externalLink}</td>
      <td>
        <Select
          options={statuses}
          defaultValue={{
            value: cur.status,
            label: cur.status === 1 ? 'active' : 'preferred',
          }}
          onChange={(e) =>
            handleStatus(e, cur, user, ind)
          }
        />
      </td>
      <td>{cur.risk}</td>
    </tr>
  )
}

export default TableRow
