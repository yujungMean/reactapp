import React from 'react';
import S from './CommentStyles';

const CommentListComponent = ({ title, count, children }) => {
  return (
    <S.ListContainer>
      {title && (
        <S.ListTitleRow>
          <span style={{ fontWeight: 700 }}>{title}</span>
          {typeof count === 'number' && (
            <span style={{ color: '#AB47FF', fontWeight: 700 }}>{count}</span>
          )}
        </S.ListTitleRow>
      )}

      <S.ListArea>
        {children}
      </S.ListArea>
    </S.ListContainer>
  );
};

export default CommentListComponent;
