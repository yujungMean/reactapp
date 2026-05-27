import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import S from '../styles/FindIdContainerStyle';

const FindIdContainer = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState(null);

  const handleFindId = async () => {
    if (!name || !phone) return;
    try {
      const res = await fetch('http://localhost:10000/public/auth/email/find', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberName: name, memberPhone: phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || '일치하는 정보가 없습니다.');
      setResult(data.data.memberEmail);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <S.Title>아이디 찾기</S.Title>
      <S.Subtitle>이름과 전화번호를 입력해 아이디를 찾으세요.</S.Subtitle>

      <S.FieldLabel>이름</S.FieldLabel>
      <S.Input
        placeholder="이름을 입력하세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <S.FieldLabel style={{ marginTop: 16 }}>전화번호</S.FieldLabel>
      <S.Input
        type="tel"
        placeholder="전화번호를 입력하세요"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {result && (
        <S.ResultBox>
          <S.ResultLabel>고객님의 아이디는</S.ResultLabel>
          <S.ResultValue>{result}</S.ResultValue>
          <S.ResultLabel>입니다.</S.ResultLabel>
        </S.ResultBox>
      )}

      {!result ? (
        <S.PrimaryButton
          onClick={handleFindId}
          $disabled={!name || !phone}
          style={{ marginTop: 24 }}
        >
          아이디 찾기
        </S.PrimaryButton>
      ) : (
        <S.PrimaryButton onClick={() => navigate('/login')} style={{ marginTop: 24 }}>
          로그인 페이지로
        </S.PrimaryButton>
      )}

      <S.Copyright>© FAIL LOG. ALL RIGHTS RESERVED.</S.Copyright>
    </>
  );
};

export default FindIdContainer;
