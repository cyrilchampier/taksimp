import React from "react"
import PropTypes from "prop-types"
import Task from "components/models/Task"
import DayWorks from "components/layouts/DayWorks"


class TrackingTable extends React.Component {

  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape(Task.propTypes)).isRequired,
    worksTodo: DayWorks.worksPropTypes.isRequired,
    worksDone: DayWorks.worksPropTypes.isRequired,
    pastDays: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        works: DayWorks.worksPropTypes.isRequired
      }))
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">

          {/* Pending tasks */}
          <div className="row border-top border-bottom">
            <div className="col-1 border-right">
              PENDING
            </div>
            {this.props.tasks.map((task) =>
              <div className="col-3 border p-0" key={task.id}>
                <Task {...task} />
              </div>
            )}
          </div>

          {/* Today to be done */}
          <DayWorks name='TODO' works={this.props.worksTodo}/>

          {/* Today done */}
          <DayWorks name='DONE' works={this.props.worksDone}/>

          {/* Previously done */}
          {this.props.pastDays
            .sort(({ date }) => date)
            .reverse()
            .map(({ date, works }) =>
              <DayWorks key={date} name={date} works={works}/>
            )}

        </div>
      </React.Fragment>
    )
  }
}

export default TrackingTable
