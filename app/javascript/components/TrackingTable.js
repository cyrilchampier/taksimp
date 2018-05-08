import React from "react"
import PropTypes from "prop-types"
import Task from "./Task"
import Work from "./Work"

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
            {this.props.works_todo.map((work) =>
              <div className="col border p-0" key={work.id}>
                <Work {...work} />
              </div>
            )}
          </div>

          {/* Today DONE */}
          <div className="row border-bottom">
            <div className="col-1 border-right">
              DONE
            </div>
            {this.props.works_done.map((work) =>
              <div className="col border p-0" key={work.id}>
                <Work {...work} />
              </div>
            )}
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
  works_todo: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([Work])
  })),
  works_done: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([Work])
  })),
}

export default TrackingTable
