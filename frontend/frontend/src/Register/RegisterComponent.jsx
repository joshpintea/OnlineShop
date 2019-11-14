
import React from 'react';
import {constants, userService} from "../service";

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true, error: ''});
        const {username, password, email} = this.state;

        if (!username || !password || !email) {
            return;
        }
        this.setState({loading: true});
        userService.register({username: username, password: password, email: email}).then(
            user => {

            }, error => {
                this.setState({error: error})
            }
        ).finally(
            () => this.setState({loading: false})
        )
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value})
    }


    render() {
        const {username, password, submitted, loading, error, email} = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (!username && submitted) ? 'has-error' : ''}>
                        <label htmlFor="username">Username</label>
                        <input type={'text'} className={'form-control'} name={'username'} value={username}
                               onChange={this.handleChange}/>
                        {submitted && !username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (!email && submitted) ? 'has-error' : ''}>
                        <label htmlFor="username">Email</label>
                        <input type={'text'} className={'form-control'} name={'email'} value={email}
                               onChange={this.handleChange}/>
                        {submitted && !email &&
                        <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (!password && submitted) ? ' has-error' : ''}>
                        <label htmlFor='password'> Password </label>
                        <input type='password' className={'form-control'} name={'password'} value={password}
                               onChange={this.handleChange}/>
                        {
                            submitted && !username &&
                            <div className='help-block'>Password is required</div>
                        }
                    </div>
                    <div className={'form-group'}>
                        <button className={'btn btn-primary'} disabled={loading}>
                            Register
                        </button>
                        {
                            loading &&
                            <img
                                src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                        }
                    </div>
                    {error &&
                    <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>

            </div>

        );
    }
}

export {RegisterComponent}