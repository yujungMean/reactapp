import React from 'react';
import S from './CommentStyles';

const MAX_LENGTH = 500;

const CommentInputComponent = ({
  value,
  onChange,
  onSubmit,
  subject = '댓글',
  placeholder,
}) => {
  const handleChange = (e) => {
    if (e.target.value.length <= MAX_LENGTH) {
      onChange(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit?.(value);
  };

  const isMax = value.length === MAX_LENGTH;

  return (
    <S.SubmitWrapper>
      <S.SubmitTextArea
        value={value}
        onChange={handleChange}
        placeholder={placeholder || `${subject}을 입력해주세요`}
      />
      <S.SubmitBottomRow>
        <S.SubmitSubTitle>{`서로를 존중하는 ${subject} 문화를 지켜주세요`}</S.SubmitSubTitle>
        <S.SubmitRightGroup>
          <S.CharCount $isMax={isMax}>
            글자 수 ({value.length} / {MAX_LENGTH})
          </S.CharCount>
          <S.SubmitBtn type="button" onClick={handleSubmit} disabled={!value.trim()}>
            <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '16px' }}>{`${subject} 등록`}</span>
          </S.SubmitBtn>
        </S.SubmitRightGroup>
      </S.SubmitBottomRow>
    </S.SubmitWrapper>
  );
};

export default CommentInputComponent;
