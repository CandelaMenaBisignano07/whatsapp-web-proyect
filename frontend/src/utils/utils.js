export const dateDifference = (message)=>{
    const TIME_LIMIT_MS = (23 * 60 * 60 + 58 * 60 + 0) * 1000;
    console.log(TIME_LIMIT_MS)
    const now = Date.now();
    const messageTimestampMs = message.created_at * 1000;
    const timeDifference = now - messageTimestampMs;
    return timeDifference <= TIME_LIMIT_MS ? true : false
}

export const verifyNumber = (number)=> {
    const regex = /^(?!.*--)[0-9\-]{9,}@[cg]\.us$/ 
    return regex.test(number)
}