// ============================================================
// Import packages
import React from 'react';
import PropTypes from 'prop-types';
// ============================================================
// Import containers

import InputEmail from '../ux/form/InputEmail';
import InputLogin from '../ux/form/InputLogin';
import InputPassword from '../ux/form/InputPassword';
import SignupButton from './SignupButton';
import Header from './Header';

// ============================================================
// Container
/**
 * Signup form
 */
class SignupForm extends React.Component {
    /**
     *
     * @param {Object} props
     * @param {Object} props.onSubmit
     */
    constructor(props) {
        super(props);

        this.state = { enabled: true };
    }

    /**
     *
     * @returns {Promise}
     * @private
     */
    async onSignUp(event) {
        event.preventDefault();

        this.disable();

        try {
            await this.props.onSignUp(this.getData());
        }
        finally {
            this.enable();
        }
    }

    /**
     *
     * @returns {LoginFormData}
     * @private
     */
    getData() {
        return {
            email: this.inputEmail.getValue(),
            login: this.inputLogin.getValue(),
            password: this.inputPassword.getValue(),
        };
    }

    /**
     * Enable the form
     * @public
     */
    enable() {
        this.toggleEnable(true);
    }

    /**
     * Disable the form
     * @public
     */
    disable() {
        this.toggleEnable(false);
    }

    /**
     * Toggle the enable state
     * @param {boolean} [enabled] - If defined, then will force the enable state
     * @return {boolean} Return the previous enabled state
     * @public
     */
    toggleEnable(enabled) {
        const previousState = !this.state.enabled;

        this.setState({
            enabled: typeof enabled === 'undefined' ? enabled : !previousState,
            ...this.state,
        });

        return previousState;
    }

    render() {
        let header;

        if (header) {
            header = (<Header />);
        }

        return (
            <form onSubmit={() => this.onSubmit()}>
                {header}
                <InputLogin
                    enabled={this.state.enabled}
                    refs={(ref) => {
                        this.inputLogin = ref;
                    }}
                />
                <InputPassword
                    enabled={this.state.enabled}
                    refs={(ref) => {
                        this.inputPassword = ref;
                    }}
                />
                <InputEmail
                    enabled={this.state.enabled}
                    refs={(ref) => {
                        this.inputEmail = ref;
                    }}
                />
                <SignupButton
                    enabled={this.state.enabled}
                    onSignUp={() => this.onSubmit()}
                />
            </form>);
    }
}

SignupForm.propTypes = {
    onSignUp: PropTypes.func.isRequired,
};

// ============================================================
// Exports
export default SignupForm;

// ============================================================
// Exports
/**
 * Callback called when the form is submitted.
 * It's expected to return a promise that will be resolved once the
 * login has been checked.
 *
 * @callback SignupFormOnSubmit
 *
 * @param {SignupFormData} data
 * @returns {Promise.<SignupFormResult>}
 */

/**
 * @typedef {Object} SignupFormData
 * @property {string} email
 * @property {string} login
 * @property {string} password
 */

/**
 * @typedef {Object} SignupFormResult
 * @property {string}  errorMessage
 * @property {boolean} success
 */
