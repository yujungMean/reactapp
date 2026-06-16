import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentItemComponent from '../../commons/comment/CommentItemComponent';
import CommentInputComponent from '../../commons/comment/CommentInputComponent';
import likeIcon from '../../../../components/resources/like.svg';
import likeFillIcon from '../../../../components/resources/like-fill2.svg';
import defaultProfile from '../../../../components/resources/default-profile.svg';
import { formatRelativeTime } from '../../../../utils/relativeTime';
import { goToMemberProfile } from '../../../../utils/profileNavigation';

const GuestbookCommentItemComponent = ({
  comment,
  currentUser,
  currentUserId,
  isPageOwner,
  onLike,
  onReplyToggle,
  replyOpen,
  replyText,
  onReplyChange,
  onReplySubmit,
  activeMenuId,
  onMenuToggle,
  onCloseMenu,
  onEdit,
  onDelete,
  onEditReply,
  onDeleteReply,
  onRereplySubmit,
  onEditRereply,
  onDeleteRereply,
  onReport,
}) => {
  const navigate = useNavigate();
  const isMyComment = comment.author === currentUser;

  const navigateToProfile = (authorId) => {
    goToMemberProfile(navigate, authorId);
  };

  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const [editingReplyId, setEditingReplyId] = useState(null);
  const [editReplyContent, setEditReplyContent] = useState('');

  const [rereplyOpenReplyId, setRereplyOpenReplyId] = useState(null);
  const [rereplyTextMap, setRereplyTextMap] = useState({});
  const [editingRereplyId, setEditingRereplyId] = useState(null);
  const [editRereplyContent, setEditRereplyContent] = useState('');

  const handleStartEdit = () => {
    setEditContent(comment.content);
    setEditMode(true);
    onCloseMenu();
  };

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      onEdit(comment.id, editContent.trim());
    }
    setEditMode(false);
  };

  const handleStartReplyEdit = (reply) => {
    setEditingReplyId(reply.id);
    setEditReplyContent(reply.content);
    onCloseMenu();
  };

  const handleSaveReplyEdit = (replyId) => {
    if (editReplyContent.trim()) {
      onEditReply(comment.id, replyId, editReplyContent.trim());
    }
    setEditingReplyId(null);
  };

  const buildMenuItems = (type, { isMine, reportArgs, onDeleteClick, onEditClick }) => {
    if (isMine) {
      return [
        { label: '수정하기', onClick: onEditClick },
        { label: '삭제하기', onClick: onDeleteClick },
      ];
    }
    if (isPageOwner) {
      return [
        { label: '신고하기', onClick: () => { onReport(...reportArgs); onCloseMenu(); } },
        { label: '삭제하기', onClick: onDeleteClick },
      ];
    }
    return [
      { label: '신고하기', onClick: () => { onReport(...reportArgs); onCloseMenu(); } },
    ];
  };

  return (
    <CommentItemComponent
      profileImg={comment.profileImg}
      defaultProfileImg={defaultProfile}
      author={comment.author}
      createdAt={formatRelativeTime(comment.createdAt)}
      content={comment.content}
      liked={comment.liked}
      likeCount={comment.likes}
      likeIcon={likeIcon}
      likeFillIcon={likeFillIcon}
      onLike={() => onLike(comment.id)}
      onProfileClick={() => navigateToProfile(comment.authorId)}
      editMode={editMode}
      editContent={editContent}
      onEditChange={setEditContent}
      onEditSave={handleSaveEdit}
      onEditCancel={() => setEditMode(false)}
      menuOpen={activeMenuId === comment.id}
      onMenuToggle={(e) => onMenuToggle(comment.id, e)}
      menuItems={buildMenuItems('comment', {
        isMine: isMyComment,
        reportArgs: ['방명록', comment.id, comment.profileImg, comment.author, comment.content],
        onDeleteClick: () => { onDelete(comment.id); onCloseMenu(); },
        onEditClick: handleStartEdit,
      })}
      showReplyButton
      replyLabel="답글"
      replyCount={comment.replies.length}
      onReplyToggle={() => onReplyToggle(comment.id)}
    >
      {(comment.replies.length > 0 || replyOpen) && (
        <>
          {comment.replies.map((reply) => {
            const isMyReply = reply.author === currentUser;
            const isEditingThisReply = editingReplyId === reply.id;

            return (
              <CommentItemComponent
                key={reply.id}
                profileImg={reply.profileImg}
                defaultProfileImg={defaultProfile}
                author={reply.author}
                createdAt={formatRelativeTime(reply.createdAt)}
                content={reply.content}
                liked={reply.liked}
                likeCount={reply.likes}
                likeIcon={likeIcon}
                likeFillIcon={likeFillIcon}
                onLike={() => onLike(comment.id, reply.id)}
                onProfileClick={() => navigateToProfile(reply.authorId)}
                editMode={isEditingThisReply}
                editContent={editReplyContent}
                onEditChange={setEditReplyContent}
                onEditSave={() => handleSaveReplyEdit(reply.id)}
                onEditCancel={() => setEditingReplyId(null)}
                menuOpen={activeMenuId === `reply-${reply.id}`}
                onMenuToggle={(e) => onMenuToggle(`reply-${reply.id}`, e)}
                menuItems={buildMenuItems('reply', {
                  isMine: isMyReply,
                  reportArgs: ['방명록 답글', reply.id, reply.profileImg, reply.author, reply.content],
                  onDeleteClick: () => { onDeleteReply(comment.id, reply.id); onCloseMenu(); },
                  onEditClick: () => handleStartReplyEdit(reply),
                })}
                showReplyButton
                replyLabel="답글"
                replyCount={(reply.rereplies || []).length}
                onReplyToggle={() => setRereplyOpenReplyId((prev) => prev === reply.id ? null : reply.id)}
              >
                {((reply.rereplies || []).length > 0 || rereplyOpenReplyId === reply.id) && (
                  <>
                    {(reply.rereplies || []).map((rereply) => {
                      const isMyRereply = rereply.author === currentUser;
                      const isEditingThisRereply = editingRereplyId === rereply.id;

                      return (
                        <CommentItemComponent
                          key={rereply.id}
                          indent
                          profileImg={rereply.profileImg}
                          defaultProfileImg={defaultProfile}
                          author={rereply.author}
                          createdAt={formatRelativeTime(rereply.createdAt)}
                          content={rereply.content}
                          liked={rereply.liked}
                          likeCount={rereply.likes}
                          likeIcon={likeIcon}
                          likeFillIcon={likeFillIcon}
                          onLike={() => onLike(comment.id, reply.id, rereply.id)}
                          onProfileClick={() => navigateToProfile(rereply.authorId)}
                          editMode={isEditingThisRereply}
                          editContent={editRereplyContent}
                          onEditChange={setEditRereplyContent}
                          onEditSave={() => {
                            if (editRereplyContent.trim()) onEditRereply(comment.id, reply.id, rereply.id, editRereplyContent.trim());
                            setEditingRereplyId(null);
                          }}
                          onEditCancel={() => setEditingRereplyId(null)}
                          menuOpen={activeMenuId === `rereply-${rereply.id}`}
                          onMenuToggle={(e) => onMenuToggle(`rereply-${rereply.id}`, e)}
                          menuItems={buildMenuItems('rereply', {
                            isMine: isMyRereply,
                            reportArgs: ['방명록 대댓글', rereply.id, rereply.profileImg, rereply.author, rereply.content],
                            onDeleteClick: () => { onDeleteRereply(comment.id, reply.id, rereply.id); onCloseMenu(); },
                            onEditClick: () => { setEditingRereplyId(rereply.id); setEditRereplyContent(rereply.content); onCloseMenu(); },
                          })}
                        />
                      );
                    })}

                    {rereplyOpenReplyId === reply.id && (
                      <CommentInputComponent
                        value={rereplyTextMap[reply.id] || ''}
                        onChange={(val) => setRereplyTextMap((prev) => ({ ...prev, [reply.id]: val }))}
                        onSubmit={() => {
                          const text = (rereplyTextMap[reply.id] || '').trim();
                          if (!text) return;
                          onRereplySubmit(comment.id, reply.id, text);
                          setRereplyTextMap((prev) => ({ ...prev, [reply.id]: '' }));
                          setRereplyOpenReplyId(null);
                        }}
                        subject="대댓글"
                        placeholder="대댓글을 남겨볼까요?"
                      />
                    )}
                  </>
                )}
              </CommentItemComponent>
            );
          })}

          {replyOpen && (
            <CommentInputComponent
              value={replyText}
              onChange={(val) => onReplyChange(comment.id, val)}
              onSubmit={() => onReplySubmit(comment.id)}
              subject="답글"
              placeholder="답글을 남겨볼까요?"
            />
          )}
        </>
      )}
    </CommentItemComponent>
  );
};

export default GuestbookCommentItemComponent;
