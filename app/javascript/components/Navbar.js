import React from "react"
import PropTypes from "prop-types"

class Navbar extends React.Component {
  PAGES = [
    { name: 'Configuration', path: '/configuration/show' },
    { name: 'Tracking', path: '/tracking/show' }
  ]

  render() {
    return (
      <React.Fragment>
        <nav className="nav nav-pills nav-fill p-3">
          {this.PAGES.map((page) =>
            <a key={page.name}
               className={"nav-item nav-link " + (page.name === this.props.activePage ? "active" : "")}
               href={page.path}>{page.name}</a>
          )}
        </nav>
      </React.Fragment>
    )
  }
}

Navbar.propTypes = {
  activePage: PropTypes.string.isRequired,
}

export default Navbar
