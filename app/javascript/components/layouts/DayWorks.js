import React from "react"
import PropTypes from "prop-types"
import Work from "components/models/Work";

class DayWorks extends React.Component {

  static worksPropTypes = PropTypes.arrayOf(PropTypes.shape(Work.propTypes))

  static propTypes = {
    name: PropTypes.string.isRequired,
    works: DayWorks.worksPropTypes.isRequired,
  }

  render() {
    return (
      <React.Fragment>
        <div className='row border-bottom ts-day-works'>
          <div className="col-2 border-right">
            {this.props.name}
          </div>
          {this.props.works.map((work) => {
            // 2 cols are taken by the row header, it leaves 10 cols for our cards
            let colClass = `col-${Math.floor(work.day_percentage / 10)}`
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
