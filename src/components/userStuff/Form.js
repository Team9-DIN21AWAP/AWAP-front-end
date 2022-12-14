import React from 'react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { inputs } from './inputs'

const STD = {
  username: '',
  password: '',
  confirmPassword: '',
}

function Form({ handleSubmit, signUp, authorized, success }) {
  const [values, setValues] = useState(STD)
  const [focused, setFocused] = useState('')

  Form.propTypes = {
    handleSubmit: PropTypes.func,
    signUp: PropTypes.bool,
    authorized: PropTypes.bool,
    success: PropTypes.bool,
  }

  function onChange(e, name) {
    setValues({ ...values, [name]: e.target.value })
  }

  const handleBlur = () => {
    setFocused('')
  }

  async function localHandleSubmit(e) {
    e.preventDefault()
    setFocused('')
    handleSubmit(e, values['username'], values['password'])
    setValues(STD)
  }
  return (
    <>
      <div className="form-container">
        <form onSubmit={localHandleSubmit}>
          {authorized ? (
            <h1>you are logged in</h1>
          ) : (
            <>
              <div>
                {inputs.map((input) => {
                  return input.loginInput || signUp ? (
                    <div className={focused === input.name ? 'has-error' : ''}>
                      <label>{input.label}</label>
                      <input
                        key={input.id}
                        name={input.name}
                        pattern={input.pattern || values['password']}
                        placeholder={input.placeholder}
                        type={input.type}
                        required={input.required}
                        value={values[input.name]}
                        onChange={(e) => onChange(e, input.name)}
                        onBlur={handleBlur}
                        onFocus={() => setFocused(input.name)}
                        className={focused === input.name ? 'has-error' : ''}
                      />
                      {<span className="errorMes">{input.errorMessage}</span>}
                    </div>
                  ) : null
                })}
              </div>
              {success ? null : (
                <div className="button-div">
                  <button>Submit</button>
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </>
  )
}

export default Form
