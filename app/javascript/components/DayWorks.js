import React from "react"
import PropTypes from "prop-types"
import Work from "./Work";

class DayWorks extends React.Component {

  static worksPropTypes = PropTypes.arrayOf(PropTypes.shape(Work.propTypes))

  static propTypes = {
    name: PropTypes.string.isRequired,
    works: DayWorks.worksPropTypes.isRequired,
  }

  render() {
    return (
      <React.Fragment>
        <div className="row border-bottom">
          <div className="col-1 border-right">
            {this.props.name}
          </div>
          {this.props.works.map((work) => {
            let colClass = `col-${Math.ceil(work.day_percentage / 10)}`
            return (<div className={`${colClass} border p-0`} key={work.id}>
              <Work {...work} />
            </div>)
          })}
        </div>
      </React.Fragment>
    )
  }
}

export default DayWorks
