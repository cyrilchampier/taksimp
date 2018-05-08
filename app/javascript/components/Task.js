import React from "react"
import PropTypes from "prop-types"

class Task extends React.Component {
  HEIGHT = '100px'

  state = { errorMessage: '' }

  createWorkInstance = () => {
    jQuery.ajax({
      type: "POST",
      url: "/works",
      data: { work: { task_id: this.props.id } },
      success: (data) => {
        let {success, object, error_message} = data
        if (success) {
          window.location.reload()
        } else {
          this.setState({ errorMessage: error_message })
        }
      },
      error: (jqXHR, textStatus, errorThrown) =>  {
        this.setState({ errorMessage: errorThrown })
      }
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="text-center" style={{ backgroundColor: this.props.color, height: this.HEIGHT  }}>
          { this.state.errorMessage &&
          <div className="alert alert-danger" role="alert">
            {this.state.errorMessage}
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
