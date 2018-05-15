import React from "react"
import PropTypes from "prop-types"
import Work from "./Work"

class Task extends React.Component {
  HEIGHT = '150px'

  // TODO: this should not be component state, but application state
  state = { errorMessage: '' }

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
  }

  _createWork = async () => {
    let { success, object, error_message } =
      await Work.createRailsInstance({ task_id: this.props.id, description: 'truc' })
    if (success) {
      window.location.reload()
    } else {
      this.setState({ errorMessage: error_message })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="text-center" style={{
          backgroundColor: this.props.color,
          height: this.HEIGHT
        }}>
          {this.state.errorMessage &&
          <div className="alert alert-danger position-absolute w-100" role="alert">
            {this.state.errorMessage}
          </div>
          }
          <div className="font-weight-bold">
            {this.props.name}
          </div>
          <div>
            {this.props.description}
          </div>
          <button className="btn btn-sm btn-outline-light" onClick={this._createWork}>
            Work
          </button>
        </div>
      </React.Fragment>
    )
  }
}

export default Task
