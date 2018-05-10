import React from "react"
import PropTypes from "prop-types"
import Task from "./Task"
import DayWorks from "./DayWorks"


class TrackingTable extends React.Component {

  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape(Task.propTypes)).isRequired,
    worksTodo: DayWorks.worksPropTypes.isRequired,
    worksDone: DayWorks.worksPropTypes.isRequired,
    past7Days: PropTypes.arrayOf(DayWorks.worksPropTypes.isRequired),
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
          {this.props.past7Days.map((day_works_done, index) =>
            <DayWorks key={`${index}`} name={`Previously (-${index + 1})`} works={day_works_done}/>
          )}

        </div>
      </React.Fragment>
    )
  }
}

export default TrackingTable
