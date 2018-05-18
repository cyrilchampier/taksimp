import React from "react"
import PropTypes from "prop-types"

// Inspired by https://github.com/bfischer/react-inline-editing
class EditableLabel extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    isEditing: PropTypes.bool,

    labelClassName: PropTypes.string,
    labelFontSize: PropTypes.string,
    labelFontWeight: PropTypes.string,

    inputMaxLength: PropTypes.number,
    inputPlaceHolder: PropTypes.string,
    inputTabIndex: PropTypes.number,
    inputWidth: PropTypes.string,
    inputHeight: PropTypes.string,
    inputFontSize: PropTypes.string,
    inputFontWeight: PropTypes.string,
    inputClassName: PropTypes.string,
    inputBorderWidth: PropTypes.string,

    onFocusIn: PropTypes.func,
    onFocusOut: PropTypes.func
  }

  static defaultProps = {
    isEditing: false,
    text: '',
    labelClassName: '',
    inputClassName: '',
    inputWidth: '200px',
    inputHeight: '25px',
    inputMaxLength: 50,
    labelFontWeight: 'normal',
    inputFontWeight: 'normal',
  }

  state = {
    isEditing: this.props.isEditing,
    text: this.props.text,
  }

  _handleFocus = () => {
    if (this.state.isEditing) {
      this.props.onFocusOut && this.props.onFocusOut(this.state.text)
    } else {
      this.props.onFocusIn && this.props.onFocusIn(this.state.text)
    }

    this.setState({ isEditing: !this.state.isEditing })
  }

  _handleChange = () => {
    this.setState({ text: this.textInput.value })
  }

  _editionModeLabel = () => {
    return (
      // TODO: use the Input component
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
    )
  }

  _readModeLabel = () => {
    return (
      <label className={this.props.labelClassName}
             onClick={this._handleFocus}
             style={{
               fontSize: this.props.labelFontSize,
               fontWeight: this.props.labelFontWeight,
             }}>
        {this.state.text}
      </label>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isEditing ? this._editionModeLabel() : this._readModeLabel()}
      </React.Fragment>
    )
  }
}

export default EditableLabel
