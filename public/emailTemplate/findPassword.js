
let mode = process.env.NODE_ENV;

module.exports = finPasswordTemplate = (token, email) => {
    return `<div class="find-password-section section" style="position:relative; width: 100%; margin: 0; padding: 0; font-family:Noto Sans, '맑은고딕','NanumGothic','MalgunGothic', dotum, 돋움, Sans-Serif;">
    <div class="find-password-section--outer" style="background-image:url('https://s3.ap-northeast-2.amazonaws.com/littleone/etc/mailing-password-bg%402x.png'); border: 1px solid #ccc; background-repeat: no-repeat; background-size: 100% auto;  width: 600px; max-width: 100%; margin: 0 auto; text-align: center; display: table; height: 680px; ">
        <div class="find-password-section--inner" style="position:relative; display: table-cell; vertical-align: middle; text-align: center;">
            <div class="find-password-section--centered" style="display: inline-block; margin-top: 170px;">
                <div class="find-password-section--centered--box" style="font-size: 14px;">
                    <p style="font-size: 1em; font-weight: normal; margin: 0; padding: 0; line-height: 1.36;">안녕하세요, ${email}님</p>
                    <p style="font-size: 1em; font-weight: normal; margin: 0; padding: 0; line-height:1.36;">비밀번호 변경 안내드립니다.</p>
                </div>
                <div class="find-password-section--centered--box" style="font-size: 14px; margin-top: 16px;">
                    <p style="font-size: 1em; font-weight: normal; line-height:1.36; margin: 0; padding: 0;">아래의 버튼을 통하여 새로운 비밀번호로 변경이 가능합니다.</p>
                    <p style="font-size: 1em; font-weight: normal; line-height:1.36; margin: 0; padding: 0;">아래 버튼은 비밀번호 찾기를 신청한 후 30분이 지나면 유효하지 않습니다.</p>
                </div>
                <div class="find-password-section--centered--box" style="font-size: 14px; margin: 31px auto 0; text-align: center">
                    <a href="${mode === 'development' ? 'http://localhost:8080':'http://www.cizz3007.com'}/email/passwordchange?token=${token}&email=${email}" style="display: inline-block; vertical-align: middle; text-align: center;">
                        <div style="display:inline-block; width: 160px; height: 36px; line-height: 36px; background-image: url('https://s3.ap-northeast-2.amazonaws.com/littleone/etc/mailing-password-btn.png'); background-size: 160px 36px; background-repeat: no-repeat;  font-size: 13px; color:#fff; font-style: normal; text-decoration: none; font-weight: 700;">비밀번호 변경하기</div>
                    </a>
                </div>
                <div class="find-password-section--centered--box" style="margin-top:91px;">
                    <p style="color:#fff; line-height: 1.36; margin: 0; padding: 0; font-size: 14px;">만일 본인이 정보를 변경하지 않거나 문제가 있을 경우,<br> <a href="mailto:smart@littleone.kr?Subject=리틀원에 문의 드립니다." style="color:#fff;letter-spacing: .5px; vertical-align: baseline;">smart@littleone.kr</a>으로 관련 내용을 전달하여 주시기 바랍니다.</p>
                </div>
                <div style="margin-top: 96px;">
                    <em style="font-size: 12px; font-weight: bold; text-decoration: none; font-style: normal;">Next Level Parenting, Littleone</em>
                    <p style="line-height: 1.5; font-weight: 300; font-size: 10px; margin-top: 10px; margin-bottom: 0;">도움이 필요하세요?<a href="mailto:smart@littleone.kr?Subject=리틀원에 문의 드립니다." style="display: inline-block; text-decoration: none; color:#333; font-size: 10px; vertical-align: baseline;">smart@littleone.kr로 이메일을 보내주세요.</a>
                        <br>© 2018 LITTLEONE All rights reserved.</p>
                </div>
            </div>
        </div>
    </div>
</div>`;
};