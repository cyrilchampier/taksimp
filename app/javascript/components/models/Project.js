import React from "react"
import PropTypes from "prop-types"

class Project extends React.Component {
  render () {
    return (
      <React.Fragment>
        Name: {this.props.name}
      </React.Fragment>
    );
  }
}

Project.propTypes = {
  name: PropTypes.string
};
export default Project
