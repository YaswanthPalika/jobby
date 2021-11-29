import './index.css'

const FilterGroups = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeLpa,
    employment,
    changeEmployment,
  } = props

  const changeLpa1 = e => {
    changeLpa(e.target.value)
  }

  const changeEmployment1 = e => {
    if (employment.includes(e.target.value)) {
      changeEmployment(e.target.value, true)
    } else {
      changeEmployment(e.target.value, false)
    }
  }

  return (
    <div>
      <br />
      <hr />
      <h2>Type of Employment</h2>
      <ul>
        {employmentTypesList.map(each => (
          <li className="filter-li" key={each.employmentTypeId}>
            <input
              type="checkBox"
              value={each.employmentTypeId}
              onChange={changeEmployment1}
            />
            <label className="filter-p" id={each.label} key={each.label}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <br />
      <hr />
      <h2>Salary Range</h2>
      <ul>
        {salaryRangesList.map(each => (
          <li className="filter-li" key={each.salaryRangeId}>
            <input
              type="radio"
              name="salary"
              value={each.salaryRangeId}
              onClick={changeLpa1}
            />
            <label className="filter-p" id={each.label} key={each.label}>
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterGroups
