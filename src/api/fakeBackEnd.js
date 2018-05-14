const timeLeft = 1500,
       pause = true;

export default {
    getTimeLeft(cb){
        cb(timeLeft,pause);
    }
}