import React from "react"
import PropTypes from "prop-types"

class Input extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,

    inputMaxLength: PropTypes.number,
    inputPlaceHolder: PropTypes.string,
    inputTabIndex: PropTypes.number,
    inputWidth: PropTypes.string,
    inputHeight: PropTypes.string,
    inputFontSize: PropTypes.string,
    inputFontWeight: PropTypes.string,
    inputClassName: PropTypes.string,
    inputBorderWidth: PropTypes.string,

    onFocusOut: PropTypes.func
  }

  static defaultProps = {
    text: '',
    inputWidth: '200px',
    inputHeight: '25px',
    inputMaxLength: 50,
    inputFontWeight: 'normal',
  }

  state = {
    text: this.props.text,
    dirty: false
  }

  _handleFocus = () => {
      this.state.dirty &&
      this.props.onFocusOut &&
      this.props.onFocusOut(this.state.text)
  }

  _handleChange = () => {
    this.setState({
      text: this.textInput.value,
      dirty: true
    })
  }

  render() {
    return (
      <React.Fragment>
        <input type="text"
               className={this.props.inputClassName}
               ref={(input) => {
                 this.textInput = input
               }}
               value={this.state.text}
               onChange={this._handleChange}
               onBlur={this._handleFocus}
               onKeyUp={(event) => {
                 if (event.keyCode === 13) {
                   this._handleFocus()
                 }
               }}
               maxLength={this.props.inputMaxLength}
               placeholder={this.props.inputPlaceHolder}
               tabIndex={this.props.inputTabIndex}
               autoFocus/>
      </React.Fragment>
    )
  }
}

export default Input
