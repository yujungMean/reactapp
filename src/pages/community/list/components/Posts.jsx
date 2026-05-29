import React from 'react';
import styled from 'styled-components';
import { boxShadow, colorCSS } from '../../style';
import Post from './Post';
import PostListEmptyContainer from './PostListEmptyContainer';

import imageEmpty from '../../resources/popular-image-empty.png'

const myStyle = {}

myStyle.wrapper = styled.div`
    width: 984px;
    background-color: ${colorCSS["faillog_white"]};
    border-radius: 15px;
    ${boxShadow["boxBasic"]}
`

//게시글 컴포넌트들을 저장하는 컨테이너
const Posts = ({postData, search = ''}) => {

  return (
    <div>
      <myStyle.wrapper>
        { postData.length !== 0 ? 
        postData.map((post, i) => (
          <Post
            key={post.id}
            id={post.id}
            category={post.category}
            title={post.title}
            content={post.content}
            date={post.date}
            profile={post.profile}
            author={post.author}
            views={post.views}
            likes={post.likes}
            isLiked={post.isLiked}
            comments={post.comments}
            thumbnail={post.thumbnail ? post.thumbnail : imageEmpty}
            isHrHidden={(postData.length-1) === i}
          />
        )) 
        : <PostListEmptyContainer search={search} />
      }
      </myStyle.wrapper>
    </div>
  );
};

export default Posts;
