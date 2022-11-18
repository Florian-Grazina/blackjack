export const TimeUtils = {
    sleep: (wait) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, wait);
        });
    }
}