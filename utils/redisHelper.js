const { redisClient } = require('../config/redisConfig')

async function setOrGet(key, cb, expireTime) {
    const cachedData = await getFromCache(key);
    if (cachedData) {
        return cachedData;
    }

    const freshData = await cb();
    await setToCache(key, freshData, expireTime);
    return freshData;
}

async function getFromCache(key) {
    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        throw error;
    }
}

async function setToCache(key, data, expireTime) {
    try {
        await redisClient.setEx(key, expireTime, JSON.stringify(data));
    } catch (error) {
        throw error;
    }
}

module.exports = { setOrGet }