import React from "react"
import PropTypes from "prop-types"

class Work extends React.Component {
  HEIGHT = '100px'

  // Returns { success, object, error_message }
  static createRailsInstance = (task_id) => {
    return jQuery.ajax({
      type: "POST",
      url: "/works",
      data: { work: { task_id: task_id } }
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="text-center" style={{ backgroundColor: this.props.color, height: this.HEIGHT }}>
          <div>
            {this.props.description}
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
}

export default Work
