import React from "react"
import PropTypes from "prop-types"
import Input from "components/basic_objects/Input"

class Work extends React.Component {
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
  static updateRailsInstance =
    async (id,
           attributes,
           { route } = {}) => {
      try {
        let url = `/works/${id}`
        if (route) {
          url += `/${route}`
        }
        let ajaxParams = {
          type: "PUT",
          url,
          data: attributes
        }
        // TODO: error processing should be factorised in a AjaxHelper class
        let response = await jQuery.ajax(ajaxParams)
        if (!response) {
          throw new Error(`'no_content' received from ${JSON.stringify(ajaxParams)}`)
        }
        // TODO: we should validate this response format
        // let { success, object, error_message } = response
        return response
      }
      catch (error) {
        if (error.responseJSON) {
          return error.responseJSON
        } else {
          let error_message = error.responseText || error
          return { success: false, object: undefined, error_message }
        }
      }
    }

  _setPercentage = async (day_percentage) => {
    let update_params = { day_percentage: day_percentage }
    if (!this.props.done_on) {
      update_params.done_on = new Date().toJSON()
    }
    let { success, object, error_message } =
      await Work.updateRailsInstance(this.props.id, { work: update_params })
    if (success) {
      // TODO: use rails action cable instead of this weird page reload
      window.location.reload()
    } else if (error_message) {
      console.error(error_message)
      // TODO: this is not working, I do not setup a state on this object. Shoulb be transformed to a global alert.
      // this.setState({ errorMessage: error_message })
    } else {
      console.error('Unknown Ajax error:', { success, object, error_message })
    }
  }

  _doneButtonsFragment = () => {
    return (
      <div className="btn-group" role="group">
        {[25, 50, 75].map((percentage) =>
          <button key={percentage}
                  type="button" className="btn btn-sm text-primary"
                  onClick={() => this._setPercentage(percentage)}>{percentage}%</button>
        )}
      </div>
    )
  }

  _onTextChange = async (text) => {
    let { success, object, error_message } =
      await Work.updateRailsInstance(
        this.props.id,
        { description: text },
        { route: 'descriptions' })
    if (success) {
      window.location.reload()
    } else {
      // TODO: move that to global error now
      console.error(error_message)
      // TODO: this is not working, I do not setup a state on this object. Shoulb be transformed to a global alert.
      // this.setState({ errorMessage: error_message })
    }
  }

  _computeBackgroundColor = () => this.props.color + '80'


  render() {
    return (
      <React.Fragment>
        <div
          className="d-flex flex-column p-2"
          style={{ backgroundColor: this._computeBackgroundColor() }}
        >

          <div className="font-weight-bold">
            {this.props.name}
          </div>
          <div>
            {this.props.descriptions
              .map((description, index) =>
                <div key={index}>{description}</div>
              )
            }
            <Input onFocusOut={this._onTextChange} />
          </div>

          <div className="mt-auto">
            {this._doneButtonsFragment()}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Work
