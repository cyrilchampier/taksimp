import React from "react"
import PropTypes from "prop-types"
import Work from "./Work"

class Task extends React.Component {
  HEIGHT = '150px'

  state = { errorMessage: '' }

  createWork = async () => {
    let { success, object, error_message } = await Work.createRailsInstance(this.props.id)
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
          <button className="btn btn-sm btn-outline-light align-bottom" onClick={this.createWork}>
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
