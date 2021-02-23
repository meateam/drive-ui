export async function getDestinationByAppId(appId) {
    let destination = ''

    // TODO: CHANGE TO ENV?
    switch (appId) {
        case 'cts':
            destination = 'CTS';
            break;
        case 'dropbox':
            destination = 'TOMCAL';
        default:
            break;
    }
   
    return destination;
  }