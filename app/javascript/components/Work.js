import React from "react"
import PropTypes from "prop-types"

class Work extends React.Component {
  HEIGHT = '100px'

  // Returns { success, object, error_message }
  static createRailsInstance = ({ task_id, description }) => {
    return jQuery.ajax({
      type: "POST",
      url: "/works",
      data: { work: { task_id, description } }
    })
  }

  // Returns { success, object, error_message }
  static updateRailsInstance = ({ id, day_percentage }) => {
    return jQuery.ajax({
      type: "PUT",
      url: `/works/${id}/done`,
      data: { work: { day_percentage } }
    })
  }

  done = async (day_percentage) => {
    // TODO: we should try around the await, or tell jQuery not to raise in case of 404 or 500
    let { success, object, error_message } =
      await Work.updateRailsInstance({ id: this.props.id, day_percentage })
    if (success) {
      window.location.reload()
    } else {
      console.log(error_message)
      // TODO: this is not working, I do not setup a state on this object. Shoulb be transformed to a global alert.
      // this.setState({ errorMessage: error_message })
    }
  }

  doneButtons = () => {
    // TODO: we should continue to display buttons to change it dynamically, even once already "done"
    if (this.props.done_on === null) {
      return (
        <div className="btn-group" role="group">
          {[25, 50, 75].map((percentage) =>
            <button key={percentage}
                    type="button" className="btn btn-outline-light"
                    onClick={() => this.done(percentage)}>{percentage}%</button>
          )}
        </div>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid text-center border"
             style={{ backgroundColor: this.props.color, height: this.HEIGHT }}>
          <div className="row">
            <div className="col-12">
              {this.props.description}
            </div>
            <div className="col-12 p-0 align-self-end">
              {this.doneButtons()}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

Work.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  color: PropTypes.string.isRequired,
  done_on: PropTypes.string
}

export default Work
