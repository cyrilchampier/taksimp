import React from "react"
import PropTypes from "prop-types"
import QueryHelper from "QueryHelper"
import Input from "components/basic_objects/Input"

class Work extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
    done_on: PropTypes.string
  }

  _setPercentage = async (day_percentage) => {
    let update_params = { day_percentage: day_percentage }
    if (!this.props.done_on) {
      update_params.done_on = new Date().toJSON()
    }
    let { success, object, error_message } =
      await QueryHelper.update('work', this.props.id, { work: update_params })
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
      await QueryHelper.update(
        'work',
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

  _handleDelete = async () => {
    let { success, object, error_message } =
      await QueryHelper.delete('work', this.props.id)
    if (success) {
      window.location.reload()
    } else {
      // TODO: move that to global error now
      console.error(error_message)
      // TODO: this is not working, I do not setup a state on this object. Shoulb be transformed to a global alert.
      // this.setState({ errorMessage: error_message })
    }
  }

  _renderHeader() {
    return (
      <div className="container-fluid mb-2">
        <div className="row">
          <div className="col font-weight-bold">
            {this.props.name}
          </div>
          <div className="col-1">
            <button type="button" className="close" onClick={this._handleDelete}>
              <span>&times;</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  _renderDescriptions() {
    return (
      <div className="mb-2">
        {this.props.descriptions
          .map((description, index) =>
            <div key={index}>{description}</div>
          )
        }
        <Input onFocusOut={this._onTextChange}/>
      </div>
    )
  }

  _renderFooter() {
    return (
      <div className="mt-auto">
        {this._doneButtonsFragment()}
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <div
          className='d-flex flex-column p-2 ts-work'
          style={{ backgroundColor: this._computeBackgroundColor() }}
        >
          {this._renderHeader()}
          {this._renderDescriptions()}
          {this._renderFooter()}
        </div>
      </React.Fragment>
    )
  }
}

export default Work
