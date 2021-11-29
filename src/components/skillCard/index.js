import './index.css'

const SkillCard = props => {
  const {x} = props
  console.log(x)
  return (
    <ul className="skills-group">
      {x.map(each => {
        console.log(each.image)
        return (
          <li key={each.name} className="skill-badge">
            <img src={each.image} alt="sour" />
            <div className="ppp">
              <p>{each.name}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default SkillCard
