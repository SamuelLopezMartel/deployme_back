module.exports.getProjectName = (url) => {
    const name = url.split('/').reverse();
    return name[0].split('').reverse().join('').substring(4).split('').reverse().join('');      
}