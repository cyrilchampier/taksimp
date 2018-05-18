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

  // TODO: factorise with Work.updateRailsInstance
  // Returns { success, object, error_message }
  static updateRailsInstance = async ({ id, done_on, name, description }) => {
    try {
      return await jQuery.ajax({
        type: "PUT",
        url: `/tasks/${id}`,
        data: { task: { done_on, name, description } }
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
      await Work.createRailsInstance({ task_id: this.props.id })
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

  // TODO: merge with `Work#_onTextChange()` ?
  _onTextChange = async (fieldName, text) => {
    console.log('Left editor with text: ' + text)
    let params = { id: this.props.id, [fieldName]: text }
    let { success, object, error_message } =
      await Task.updateRailsInstance(params)
    if (success) {
      window.location.reload()
    } else {
      console.log(error_message)
      // TODO: this is not working, I do not setup a state on this object. Shoulb be transformed to a global alert.
      // this.setState({ errorMessage: error_message })
    }
  }

  _doneButtonsFragment = () => {
    return (
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-sm text-primary" onClick={this._createWork}>
          Work
        </button>
        <button type="button" className="btn btn-sm text-success" onClick={this._finishTask}>
          Done
        </button>
      </div>
    )
  }

  _computeBackgroundColor = () => this.props.color + '80'

  render() {
    return (
      <React.Fragment>
        <div
          className="d-flex flex-column p-2"
          style={{
            backgroundColor: this._computeBackgroundColor(),
            height: this.HEIGHT
          }}>

          {this.state.errorMessage &&
          <div className="alert alert-danger position-absolute w-100" role="alert">
            {this.state.errorMessage}
          </div>
          }

          <div>
            <EditableLabel
              text={this.props.name}
              labelClassName="font-weight-bold"
              onFocusOut={(text) => this._onTextChange('name', text)}
            />
          </div>
          <div>
            <EditableLabel
              text={this.props.description}
              onFocusOut={(text) => this._onTextChange('description', text)}
            />
          </div>

          <div className="mt-auto">
            {this._doneButtonsFragment()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Task
