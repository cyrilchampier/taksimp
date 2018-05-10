import React from "react"
import PropTypes from "prop-types"
import Work from "./Work"

class Task extends React.Component {
  HEIGHT = '150px'

  // TODO: this should not be componont state, but application state
  state = { errorMessage: '' }

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
  }

  createWork = async () => {
    // TODO: we should try around the await, or tell jQuery not to raise in case of 404 or 500
    let { success, object, error_message } =
      await Work.createRailsInstance({task_id: this.props.id, description: 'truc' })
    if (success) {
      window.location.reload()
    } else {
      this.setState({ errorMessage: error_message })
    }
  }

  // TODO: that component should be a card, to have a nicer presentation than the current row-cols
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
          <button className="btn btn-sm btn-outline-light" onClick={this.createWork}>
            Work
          </button>
        </div>
      </React.Fragment>
    )
  }
}

export default Task
