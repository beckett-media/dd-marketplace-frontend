import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
function Error({ statusCode }) {
    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : 'An error occurred on client'}
        </p>
    );
}
Error.getInitialProps = ({ req, res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    // Only require Rollbar and report error if we're on the server
    if (!typeof window === 'undefined') {
        console.log('Reporting error to Rollbar...');
        const Rollbar = require('rollbar');
        const rollbar = new Rollbar("9d1d02bc6dbe43fa8f1caae0bc78aa42");
        rollbar.error(err, req, (rollbarError) => {
            if (rollbarError) {
                console.error('Rollbar error reporting failed:');
                console.error(rollbarError);
                return;
            }
            console.log('Reported error to Rollbar');
        });
    }
    return { statusCode };
};
export default Error;
