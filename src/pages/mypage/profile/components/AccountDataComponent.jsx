import React, { useState } from 'react';
import S from '../styles/MyProfileStyle';
import PasswordChangePopup from './PasswordChangePopup';
import PopupComponent from '../../../../components/commons/PopupComponent';

const AccountDataComponent = ({
  memberNickname,
  memberEmail,
  memberName,
  memberPhone,
  memberPhoneVerified,
  onPhoneVerify,
  onNameInfoEdit,
  onUnregister,
  onPasswordSubmit,
  isSocialLogin = false,
}) => {
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [socialLoginMsg, setSocialLoginMsg] = useState('');

  const handlePasswordChangeClick = () => {
    if (isSocialLogin) {
      setSocialLoginMsg('소셜로그인은 비밀번호 변경이 불가합니다.');
    } else {
      setShowPasswordPopup(true);
    }
  };

  return (
    <>
      <PopupComponent
        isOpen={!!successMsg}
        message={successMsg}
        onConfirm={() => setSuccessMsg('')}
      />
      <PopupComponent
        isOpen={!!socialLoginMsg}
        message={socialLoginMsg}
        onConfirm={() => setSocialLoginMsg('')}
      />
      <PasswordChangePopup
        isOpen={showPasswordPopup}
        memberEmail={memberEmail}
        memberNickname={memberNickname}
        submitError={passwordError}
        onClose={() => { setShowPasswordPopup(false); setPasswordError(''); }}
        onSubmit={(currentPw, newPw) => {
          setPasswordError('');
          Promise.resolve(onPasswordSubmit?.(currentPw, newPw))
            .then(() => {
              setShowPasswordPopup(false);
              setSuccessMsg('비밀번호가 변경되었습니다.');
            })
            .catch((err) => {
              setPasswordError(err?.response?.data?.message || '비밀번호 변경에 실패했습니다.');
            });
        }}
      />
      <S.AccountDataCard>
        <S.AccountList>
          <S.AccountItem>
            <div className="ItemLabel">아이디</div>
            <div className="ItemContent">
              <span className="EmailText">{memberEmail || 'test@example.com'}</span>
              <p className="SubNotice">
                • 현재 가입된 아이디입니다. 소셜 계정으로 가입된 유저의 경우, 아이디는 가입 시 사용한 이메일로  표시됩니다.
              </p>
            </div>
          </S.AccountItem>

          <S.AccountItem>
            <div className="ItemLabel">본인인증</div>
            <div className="ItemContent">
              {memberPhoneVerified === 1 ? (
                <div className="VerifiedStatus">
                  <span className="StatusBadge">인증됨</span>
                  <span className="UserInfoText">{memberName} / {memberPhone}</span>
                </div>
              ) : (
                <span className="UnverifiedText">인증이 필요합니다.</span>
              )}
              <p className="SubNotice">• 본인 명의 휴대폰 번호를 변경하려면, 다시 본인인증을 진행하셔야 합니다.</p>
            </div>
            <button className="ItemBtn" onClick={memberPhoneVerified === 1 ? onNameInfoEdit : onPhoneVerify}>
              {memberPhoneVerified === 1 ? '수정하기' : '본인인증'}
            </button>
          </S.AccountItem>

          <S.AccountItem>
            <div className="ItemLabel">비밀번호 변경</div>
            <div className="ItemContent"></div>
            <button className="ItemBtn" onClick={handlePasswordChangeClick}>변경</button>
          </S.AccountItem>

          <S.AccountItem>
            <div className="ItemLabel">회원탈퇴</div>
            <div className="ItemContent"></div>
            <button className="ItemBtn UnregisterBtn" onClick={onUnregister}>탈퇴하기</button>
          </S.AccountItem>
        </S.AccountList>
      </S.AccountDataCard>
    </>
  );
};

export default AccountDataComponent;
