export function getOsType() {
    var os = 'unknown_os';
    if (navigator.userAgent.indexOf('Win') !== -1) os = 'windows';
    if (navigator.userAgent.indexOf('Mac') !== -1) os = 'mac_os';
    if (navigator.userAgent.indexOf('Linux') !== -1) os = 'linux';
    if (navigator.userAgent.indexOf('android') !== -1) os = 'android';
    if (navigator.userAgent.indexOf('ios') !== -1) os = 'ios';
    return os;
}
