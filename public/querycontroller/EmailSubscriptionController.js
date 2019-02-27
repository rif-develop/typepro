//schema
const EmailSubscription = require('../scheme/emailSubscribeSchema');

class EmailSubscriptionController {


    // 중복된 이멜인지 확인합니다.
    static async checkDuplicatedEmail(email) {
        return new Promise((resolve, reject) => {
            console.log('# 이미 구독한 이메일 인지 확인합니다.');
            EmailSubscription.findOne({
                email: email
            }).lean().exec((err, docs) => {
                //이걸 가쟈다쓰느 곳에 catch문으로 던짐
                if(err){
                    reject('server');
                }

                if (docs) {
                    resolve(docs);
                } else{
                    //검색 된 게 없다면 일단 0이라고 가정 하게 반환한다.
                    resolve(0);
                }
            })
        });
    }

    //구독 스키마에 이메일을 추가합니다.
    static async saveEmail(email){
        return new Promise((resolve,reject)=>{
            console.log('# 이메일을 구독 스키마에 저장합니다.');

            //스키마 틀
            const emailSchema = new EmailSubscription({
               email:email
            });

            emailSchema.save((err,docs)=>{
                if(err){
                    reject('server');
                }
                if(docs){
                    console.log(docs);
                    resolve(docs);
                }
             });
        });
    }

}//end class

module.exports = EmailSubscriptionController;