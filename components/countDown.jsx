import React from 'react';
import moment from 'moment';

class Countdown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const { timeTillDate, timeFormat } = this.props;
            const then = moment(timeTillDate, timeFormat);
            const now = moment();
            const countdown = moment(then - now);
            const days = countdown.format('D');
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');
            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;

        if (!seconds) {
            return null;
        }

        return (
            <div>
                <div className="" style={{ display: 'flex' }}>
                    {days && <div className="">{days}</div>}
                    {hours && (
                        <div className="">
                            <span>:</span>
                            {hours}
                        </div>
                    )}
                    {minutes && (
                        <div className="">
                            <span>:</span>
                            {minutes}
                        </div>
                    )}
                    {seconds && (
                        <div className="">
                            <span>:</span>
                            {seconds}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default Countdown;
