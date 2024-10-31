export const convertFirestoreTimestampToJS = (timeStamp) => {
    if (timeStamp !== null && timeStamp !== undefined) {
        const firebaseTimeStamp = new Date(timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000)
        const result =
            firebaseTimeStamp.getDate() + '.' + 
            (firebaseTimeStamp.getMonth() + 1) + '.' + 
            firebaseTimeStamp.getFullYear() + ' ' +
            firebaseTimeStamp.getHours() + ':' +
            String(firebaseTimeStamp.getMinutes()).padStart(2, '0') + ';' +
            String(firebaseTimeStamp.getSeconds()).padStart(2, '0')
        return result
    } else {
        return ''
    }
}