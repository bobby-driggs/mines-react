import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    pad(num, width, pad) {
        pad = pad || '0';
        num = num + '';
        return num.length >= width ? num : new Array(width - num.length + 1).join(pad) + num;
      }

    render() {
        return (
            <span>Time: {this.pad(this.props.minutes, 2)}:{this.pad(this.props.seconds, 2)}</span>
        );
    }
}

export default Timer;