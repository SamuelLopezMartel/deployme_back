var rexec = require('remote-exec');
module.exports.remoteExecuter = (publicIp, commands) => {
    return new Promise ((resolve , reject ) => {
    const hosts = [ publicIp ];  
    rexec(hosts, commands, connection_options(), function(err){
        if ( err ){
            console.log(' Fail execute remote scripts ' , err)
            reject()
        }else {
            console.log('Great Success!!')
            resolve();
        }
    });
    })
}
const connection_options = () => ( {
    port: 22,
    username: 'ubuntu',
    privateKey: require('fs').readFileSync('./private/deploymepairkeys.pem'),
    passphrase: ''
 });
                    