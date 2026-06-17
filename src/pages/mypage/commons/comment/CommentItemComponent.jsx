import React, { useState } from 'react';
import S from './CommentStyles';
import menuIcon from '../../../community/resources/menuIcon.svg';

const CONTENT_LIMIT = 230;

const CommentItemComponent = ({
  profileImg,
  defaultProfileImg,
  author,
  createdAt,
  content,
  liked,
  likeCount,
  likeIcon,
  likeFillIcon,
  onLike,
  onProfileClick,
  editMode,
  editContent,
  onEditChange,
  onEditSave,
  onEditCancel,
  menuOpen,
  onMenuToggle,
  menuItems = [],
  showReplyButton,
  replyLabel = '답글',
  replyCount,
  onReplyToggle,
  indent,
  deleted,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  const isOverflow = content && content.length > CONTENT_LIMIT;
  const displayText = isOverflow && !expanded ? content.slice(0, CONTENT_LIMIT) : content;

  const cardBody = (
    <>
      <S.TopRow>
        <S.ProfileGroup>
          {(profileImg || defaultProfileImg) && (
            <S.AvatarWrap>
              <S.ProfileImg
                src={profileImg || defaultProfileImg}
                alt="profile"
                onError={(e) => { if (defaultProfileImg) e.target.src = defaultProfileImg; }}
                onClick={onProfileClick}
                style={{ cursor: onProfileClick ? 'pointer' : 'default' }}
              />
            </S.AvatarWrap>
          )}
          <S.AuthorName onClick={onProfileClick}>{author}</S.AuthorName>
          <S.DateText>{createdAt}</S.DateText>
        </S.ProfileGroup>

        {menuItems.length > 0 && (
          <S.MenuContainer>
            <S.MenuBtn type="button" aria-label="옵션" onClick={onMenuToggle}>
              <img src={menuIcon} width={20} height={20} alt="메뉴" />
            </S.MenuBtn>
            {menuOpen && (
              <S.Dropdown onClick={(e) => e.stopPropagation()}>
                {menuItems.map((item) => (
                  <S.DropdownItem key={item.label} onClick={item.onClick}>
                    {item.label}
                  </S.DropdownItem>
                ))}
              </S.Dropdown>
            )}
          </S.MenuContainer>
        )}
      </S.TopRow>

      {editMode ? (
        <>
          <S.EditTextArea
            value={editContent}
            onChange={(e) => onEditChange(e.target.value)}
            autoFocus
          />
          <S.EditActionRow>
            <span />
            <S.EditBtnGroup>
              <S.CancelEditBtn type="button" onClick={onEditCancel}>취소</S.CancelEditBtn>
              <S.SaveEditBtn type="button" onClick={onEditSave}>저장</S.SaveEditBtn>
            </S.EditBtnGroup>
          </S.EditActionRow>
        </>
      ) : (
        <>
          <S.ContentArea>
            <S.ContentText>
              {displayText}
              {isOverflow && !expanded && '... '}
              {isOverflow && (
                <S.InlineToggle onClick={() => setExpanded((prev) => !prev)}>
                  {expanded ? ' (접기)' : '(자세히보기)'}
                </S.InlineToggle>
              )}
            </S.ContentText>
          </S.ContentArea>

          <S.ActionRow>
            <S.LikeGroup type="button" onClick={onLike}>
              <img src={liked ? likeFillIcon : likeIcon} alt="좋아요" />
              <span>{likeCount}</span>
            </S.LikeGroup>
            {showReplyButton && (
              <S.ReplyBtn type="button" onClick={onReplyToggle}>
                {replyLabel}{replyCount > 0 ? ` ${replyCount}` : ''}
              </S.ReplyBtn>
            )}
          </S.ActionRow>
        </>
      )}
    </>
  );

  if (deleted) {
    return (
      <S.ItemWrapper $indent={indent}>
        {indent ? (
          <S.IndentCard>
            <S.DeletedText>삭제된 댓글입니다.</S.DeletedText>
          </S.IndentCard>
        ) : (
          <S.DeletedText>삭제된 댓글입니다.</S.DeletedText>
        )}
        {children && (
          <S.SectionArea>
            <S.Divider />
            <S.ChildListArea>{children}</S.ChildListArea>
          </S.SectionArea>
        )}
      </S.ItemWrapper>
    );
  }

  return (
    <S.ItemWrapper $indent={indent}>
      {indent ? (
        <S.IndentCard>{cardBody}</S.IndentCard>
      ) : (
        cardBody
      )}

      {children && (
        <S.SectionArea>
          <S.Divider />
          <S.ChildListArea>
            {children}
          </S.ChildListArea>
        </S.SectionArea>
      )}
    </S.ItemWrapper>
  );
};

export default CommentItemComponent;
