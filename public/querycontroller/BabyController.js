//아기 스키마
const Baby = require('../scheme/babySchema');
//유저 스키마
const User = require('../scheme/userSchema');
const Validations = require('../middleware/Validations');

//s3 method
const {s3delete} = require('../middleware/AwsS3');


class BabyController {
    //아이를 생성합니다.
    static async createBaby(babyObj) {
        try {
            console.log('# 아이를 생성합니다.');
            //이 함수룰 가져다 쓰는 곳에서 asnyc, await을 써야지 값이 제대로 넘어간다.  then이라는  promise를 썻으니 값이 넘어갈 것. 호출하는 곳도 await써줄것
            const result = babyObj.save().then((result) => {
                return result;
            }).catch((err) => {
                throw 'server'
            });

            return result;
        } catch (e) {
            console.log('#에러 받았소~');
            return false
        }
    };

    //아이 한 명을 제거하는 메서드
    static async deleteOneBaby(clientIdx, babyIdx) {
        return new Promise(async (resolve, reject) => {
            try {
                //1. 삭제시 defaultBaby:true라면 맨 마지막 등록한 아기를 defaultBaby:true로 만들어준다. 그러고 true인 객체를 반환한다.
                // 2. 삭제시 defaultBaby:true면 currentBaby를 초기화한다.
                console.log('# 아이를 삭제 메서드 시작');

                Baby.findOneAndRemove({
                    _id: babyIdx,
                    parent: clientIdx
                }).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        const isEmptyS3Key = Validations.isEmpty(docs.src);

                        //2.아이가 썸네일이 있는 경우에는 썸네일도 삭제해준다.
                        if (!isEmptyS3Key) {
                            //s3에서 이미지 삭제
                            console.log('# 썸네일이 있는 아이입니다.');
                            s3delete(docs.src);
                        }
                        resolve(docs);
                    }
                });

            } catch (e) {
                console.log(e);
                return e;
            } finally {
                console.log('# 아이 삭제 메서드 종료.');

            } //end try~catch
        });
    }

    //모든 아이를 제거하는 메서드
    static async deleteAllBabies(clientIdx) {

    }

    //아이를 수정합니다.
    static async updateOneBaby(objVal) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 아이를 수정 시작');

                Baby.findOneAndUpdate({_id: objVal._id, parent: objVal.parent,}, {
                        $set: {
                            'name': objVal.name,
                            'weight': objVal.weight,
                            'height': objVal.height,
                            'year': objVal.year,
                            'month': objVal.month,
                            'date': objVal.date,
                            'bloodType': objVal.bloodType,
                            'gender': objVal.gender,
                            'src': objVal.src
                        }
                    }, {
                        multi: true,
                        new: true,
                        $setOnInsert: true
                    }
                ).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        console.log('# 아이 수정 결과', docs);
                        resolve(docs);
                    }
                });

            } catch (e) {
                console.log(e);
                return e;
            } finally {
                console.log('# 아이 수정 종료');
            }
        });
    }

    //아이의 혈액형이 지정된 Enum에 부합하는 지 확인
    static async checkBloodType(bloodType) {

        return new Promise((resolve, reject) => {
            const bloodEnum = ['A', 'B', 'O', 'AB'];

            try {
                bloodEnum.forEach((ele, i) => {
                    if (bloodType.indexOf(ele) === 0) {
                        console.log(`아이의 혈액형은 : ${bloodType}입니다.`);
                        return resolve(true);
                    }
                });
            } catch (e) {
                console.log('# 혈액형 검사 중에 에러가 발생했습니다.');
                return reject(false);
            }
        });
    }

    //유저의 아이가 몇 명인지 구하는 메서드
    static async countUserBabies(parentId) {

        return new Promise((resolve, reject) => {
            try {
                console.log('# 아이가 몇 명인지 검색합니다.');

                Baby.find({parent: parentId}).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        console.log(`# 아이의 수 : ${docs.length}`);
                        return resolve(docs.length);
                    } else {
                        console.log('# 아이가 없습니다.');
                    }
                });
            } catch (e) {
                return e
            } finally {
                console.log('# 아이 검색 종료');
            }

        });

    }


    //한 명의 아이를 반환하는 메서드
    static async findOneBaby(clientIdx, babyIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 아이 검색 메서드 실행');
                Baby.findOne({_id: babyIdx, parent: clientIdx}).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        resolve(docs);
                    }
                });
            } catch (e) {
                console.log(e);
                return e;
            } finally {
                console.log('# 아이 검색 메서드 종료');
            }
        });
    }

    //defaultBaby가 true인 아기를 찾아서 반환(기본아기)하는 메서드;
    static async getDefaultBaby(clientIdx) {
        return new Promise((resolve, reject) => {
            try {
                console.log('# 쿼리 시작');
                console.log(clientIdx);

                Baby.findOne({
                    parent: clientIdx,
                    defaultBaby: true
                }).lean().exec((err, docs) => {
                    if (err) {
                        reject('server');
                    }

                    if (docs !== null) {
                        console.log('# defaultBaby가 true인 아기');
                        resolve(docs);
                    } else {
                        console.log('# defaultBaby 전부 false');

                        resolve(false)
                    }
                })
            } catch (e) {
                reject(e);
            } finally {
                console.log('# 쿼리 종료');
            }

        });
    }

    //매개변수를 제외한 나머지 아이들의 값 defaultBaby를 false로, 매개변수로 넘긴 값은 true로
    static async setAllDefaultBabyToFalse(clientIdx, babyIdx) {
        return new Promise((resolve, reject) => {
            try {
                //defaultBaby:false
                console.log('# defaultBaby 변경 중..');
                Baby.updateMany({
                    parent: clientIdx,
                    _id: {
                        $nin: babyIdx
                    }
                }, {
                    $set: {
                        defaultBaby: false
                    }
                }, {
                    new: true,
                    multi: true,
                    $setOnInsert: true
                }).lean().exec((err, docs) => {
                    if (err) {
                        reject('server')
                    }

                    if (docs) {

                        console.log(docs);

                        Baby.findOneAndUpdate({
                            _id: babyIdx,
                            parent: clientIdx
                        }, {
                            $set: {
                                defaultBaby: true
                            }
                        }, {
                            new: true,
                            $setOnInsert: true
                        }).lean().exec((err, docs) => {
                            if (err) {
                                reject('server')
                            }
                            if (docs) {
                                console.log(docs);
                                resolve(docs);
                            }
                        });
                    }
                });//query


            } catch (e) {
                reject('server')
            } finally {
                console.log('# defaultBaby 변경 끝');
            }
        });
    }


    //아이를 기본 아이 상태로 바꾼다.(defaultBaby가 true인 아이가 페이지 로드후 보인다.);
    static async setDefaultBaby(clientIdx) {
        return new Promise((resolve, reject) => {
            try {
                Baby.findOne({
                    parent: clientIdx
                }).sort({$natural: 1}).limit(1).lean().exec((err, docs) => {

                    if (err) {
                        reject('server');
                    }

                    if (docs) {
                        console.log('setDefaultBaby ',docs);
                        Baby.findOneAndUpdate({
                            _id: docs._id,
                            parent: clientIdx
                        }, {
                            $set: {'defaultBaby': true}
                        }).lean().exec((err, docs) => {
                            if (err) {
                                reject('server');
                            }

                            if (docs) {
                                console.log('# defaultBaby 설정 완료');
                                resolve(docs);
                            }
                        });
                    }
                });
            } catch (e) {
                reject(e);
            } finally {
                console.log('# 아이 기본설정화 메서드 종료');
            }
        });
    }


}//end class

module.exports = BabyController;