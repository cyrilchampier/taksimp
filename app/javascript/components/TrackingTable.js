import React from "react"
import PropTypes from "prop-types"
import Task from "./Task"

class TrackingTable extends React.Component {
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

          {/* Today TODO */}
          <div className="row border-bottom">
            <div className="col-1 border-right">
              TODO
            </div>
          </div>

          {/* Today DONE */}
          <div className="row border-bottom">
            <div className="col-1 border-right">
              DONE
            </div>
          </div>

          {/* Yesterday DONE */}
          <div className="row border-bottom">
            <div className="col-1 border-right">
              Yesterday
            </div>
          </div>

        </div>
      </React.Fragment>
    )
  }
}

TrackingTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([Task])
  })),
}

export default TrackingTable
