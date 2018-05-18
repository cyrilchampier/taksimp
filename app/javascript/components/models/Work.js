import React from "react"
import PropTypes from "prop-types"
import EditableLabel from "layouts/EditableLabel"

class Work extends React.Component {
  HEIGHT = '100px'

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
    done_on: PropTypes.string
  }

  // Returns { success, object, error_message }
  static createRailsInstance = async ({ task_id, description }) => {
    try {
      return await jQuery.ajax({
        type: "POST",
        url: "/works",
        data: { work: { task_id, description } }
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

  // Returns { success, object, error_message }
  static updateRailsInstance = async ({ id, description, day_percentage, done_on }) => {
    try {
      return await jQuery.ajax({
        type: "PUT",
        url: `/works/${id}`,
        data: { work: { description, day_percentage, done_on } }
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

  _setPercentage = async (day_percentage) => {
    let update_params = { day_percentage: day_percentage }
    if (!this.props.done_on) {
      update_params.done_on = new Date().toJSON()
    }
    let { success, object, error_message } =
      await Work.updateRailsInstance({ id: this.props.id, ...update_params })
    if (success) {
      // TODO: use rails action cable instead of this weird page reload
      window.location.reload()
    } else {
      console.error(error_message)
      // TODO: this is not working, I do not setup a state on this object. Shoulb be transformed to a global alert.
      // this.setState({ errorMessage: error_message })
    }
  }

  _doneButtonsFragment = () => {
    return (
      <div className="btn-group" role="group">
        {[25, 50, 75].map((percentage) =>
          <button key={percentage}
                  type="button" className="btn btn-outline-light"
                  onClick={() => this._setPercentage(percentage)}>{percentage}%</button>
        )}
      </div>
    )
  }

  _onDescriptionChange = async (text) => {
    console.log('Left editor with text: ' + text)
    let { success, object, error_message } =
      await Work.updateRailsInstance({ id: this.props.id, description: text })
    if (success) {
      window.location.reload()
    } else {
      console.log(error_message)
      // TODO: this is not working, I do not setup a state on this object. Shoulb be transformed to a global alert.
      // this.setState({ errorMessage: error_message })
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid text-center border"
             style={{ backgroundColor: this.props.color, height: this.HEIGHT }}>
          <div className="row">
            <div className="col-12 font-weight-bold">
              {this.props.name}
            </div>
            <div className="col-12">
              <EditableLabel text={this.props.description}
                             onFocusOut={this._onDescriptionChange}
              />
            </div>
            <div className="col-12 p-0 align-self-end">
              {this._doneButtonsFragment()}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Work
