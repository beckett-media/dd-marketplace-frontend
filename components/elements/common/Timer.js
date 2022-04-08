const Timer = ({ days, hrs, mins, sec }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
            <div>
                {' '}
                <h4>{days}</h4>
                <p>Days</p>
            </div>{' '}
            <p
                style={{
                    fontSize: '15px',
                    color: '#fff',
                    fontWeight: 'bold',
                }}>
                :
            </p>
            <div>
                {' '}
                <h4>{hrs}</h4>
                <p>Hrs</p>
            </div>{' '}
            <p
                style={{
                    fontSize: '15px',
                    color: '#fff',
                    fontWeight: 'bold',
                }}>
                :
            </p>
            <div>
                {' '}
                <h4>{mins}</h4>
                <p>Mins</p>
            </div>{' '}
            <p
                style={{
                    fontSize: '15px',
                    color: '#fff',
                    fontWeight: 'bold',
                }}>
                :
            </p>
            <div>
                {' '}
                <h4>{sec}</h4>
                <p>Sec</p>
            </div>{' '}
        </div>
    );
};

export default Timer;
