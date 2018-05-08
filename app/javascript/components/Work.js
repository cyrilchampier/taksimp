import React from "react"
import PropTypes from "prop-types"

class Work extends React.Component {
  HEIGHT = '100px'

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
