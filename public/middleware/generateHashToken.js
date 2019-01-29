const nanoid = require('nanoid');

//-,.()를 제외하고, A-Za-z0-9_-로 이루어진 urlsafe한 토큰을 생성한다.
generateHashToken = async (length) => {
    return await nanoid(length);
};

module.exports = generateHashToken;