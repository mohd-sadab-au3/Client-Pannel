import React from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
    return (
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label>
            <input
                type={props.type}
                className="form-control"
                required={props.required}
                value={props.value}
                onChange={props.inputChange}
                name={props.name}
                placeholder={props.placeholder}
                disabled={props.disabled}
            />

        </div>
    )
}

Input.defaultProps = {

    type: "text",
    value: "",
    required: true,
    onChange: () => { }

}

Input.propTypes = {
    onChange: PropTypes.func.isRequired
}

export default Input;
