import React from "react"
import PropTypes from "prop-types"

class Task extends React.Component {
  state = { error_message: '' };

  createWorkInstance = () => {
    jQuery.ajax({
      type: "POST",
      url: "/works",
      data: { work: { task_id: this.props.id } },
      success: (data) => {
        if (data.success) {
          window.location.reload()
        } else {
          this.setState({ error_message: data.error_message })
        }
      },
      error: (jqXHR, textStatus, errorThrown) =>  {
        this.setState({ error_message: errorThrown })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="col-3 border text-center" style={{ backgroundColor: this.props.color }}>
          { this.state.error_message &&
          <div className="alert alert-danger" role="alert">
            {this.state.error_message}
          </div>
          }
          <div className="font-weight-bold">
            {this.props.name}
          </div>
          <div>
            {this.props.description}
          </div>
          <button className="btn btn-sm btn-outline-light" onClick={this.createWorkInstance}>
            Work
          </button>
        </div>
      </React.Fragment>
    )
  }
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
}

export default Task
