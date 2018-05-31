import React from "react"
import PropTypes from "prop-types"

class Project extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="ts-project">
          Name: {this.props.name}
        </div>
      </React.Fragment>
    );
  }
}

Project.propTypes = {
  name: PropTypes.string
};
export default Project
