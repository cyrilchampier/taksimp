import React from "react"
import PropTypes from "prop-types"
import QueryHelper from "QueryHelper"
import EditableLabel from "components/basic_objects/EditableLabel"

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
      await QueryHelper.create('work', { work: { task_id: this.props.id } })
    if (success) {
      window.location.reload()
    } else {
      this.setState({ errorMessage: error_message })
    }
  }

  _finishTask = async () => {
    let { success, object, error_message } =
      await QueryHelper.update('task', this.props.id, { task: { done_on: new Date().toJSON() } })
    if (success) {
      window.location.reload()
    } else {
      this.setState({ errorMessage: error_message })
    }
  }

  _onTextChange = async (fieldName, text) => {
    let { success, object, error_message } =
      await QueryHelper.update('task', this.props.id, { task: { [fieldName]: text } })
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
          className='d-flex flex-column p-2 ts-task'
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
