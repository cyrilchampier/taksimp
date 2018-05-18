import React from "react"
import PropTypes from "prop-types"
import Work from "models/Work"
import EditableLabel from "layouts/EditableLabel"

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

  // Returns { success, object, error_message }
  static updateRailsInstance = async ({ id, done_on }) => {
    try {
      return await jQuery.ajax({
        type: "PUT",
        url: `/tasks/${id}`,
        data: { task: { done_on } }
      })
    }
    catch (error) {
      // TODO: this processing should be factorised in a AjaxHelper class
      if (error.responseJSON) {
        return error.responseJSON
      } else {
        return { success: false, object: undefined, error_message: error.responseText }
      }
    }
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

  _finishTask = async () => {
    let { success, object, error_message } =
      await Task.updateRailsInstance({ id: this.props.id, done_on: new Date().toJSON() })
    if (success) {
      window.location.reload()
    } else {
      this.setState({ errorMessage: error_message })
    }
  }

  _doneButtonsFragment = () => {
    return (
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-sm btn-outline-light" onClick={this._createWork}>
          Work
        </button>
        <button type="button" className="btn btn-sm btn-outline-light" onClick={this._finishTask}>
          Done
        </button>
      </div>
    )
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
            <EditableLabel text={this.props.description}
                           onFocusOut={this._onDescriptionChange}
            />
          </div>
          {this._doneButtonsFragment()}
        </div>
      </React.Fragment>
    )
  }
}

export default Task
