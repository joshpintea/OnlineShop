import React from 'react';
import Toast from 'react-bootstrap/Toast'

class ToastH extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: props.show,
            message: props.message
        };

        this.setShow = this.setShow.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({show: nextProps.show, message: nextProps.message});
    }

    setShow(show) {
        this.setState({show: show})
    }

    render() {
        const {show} = this.state;
        return (
            <Toast onClose={() => this.setShow(false)} show={show} delay={1000000} autohide>
                <Toast.Header>
                    <strong className="mr-auto">Message</strong>
                </Toast.Header>
                <Toast.Body>{this.state.message}</Toast.Body>
            </Toast>
        )
    }
}

export {ToastH};