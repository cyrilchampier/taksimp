import React from "react"
import PropTypes from "prop-types"

class Task extends React.Component {
  createWorkInstance() {
    Rails.ajax({
      type: "POST",
      url: "/works",
      data: 'task_id=3',
      success: function(response){ },
      error: function(response){ }
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-3 border text-center" style={{ backgroundColor: this.props.color }}>
          <div className="font-weight-bold">
            {this.props.name}
          </div>
          <div>
            {this.props.description}
          </div>
          <button className="btn" onClick={this.createWorkInstance}>
            Work
          </button>
        </div>
      </React.Fragment>
    );
  }
}

Task.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
};
export default Task
