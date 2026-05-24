import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { flexCenterColumn } from '../../../styles/common';
import PostForm from '../create/components/PostForm';

// categoryId(1~5) → CATEGORY_OPTIONS 문자열 (시장/창업=1, 공부/취업=2, 인간관계=3, 건강/루틴=4, 기타=5)
const CATEGORY_ID_TO_NAME = [null, '공부/취업', '사업/창업', '인간관계', '건강/루틴', '기타'];

const CommunityEditContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:10000/api/posts/read/${id}`);
                const json = await res.json();
                if (json.success) setPostData(json.data);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (data) => {
        const res = await fetch('http://localhost:10000/api/posts/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: Number(id),
                postTitle: data.title,
                postContent: data.content,
                categoryId: data.category + 1,
            }),
        });
        if (!res.ok) return;
        const json = await res.json();
        if (json.success) navigate(`/community/detail/${id}`);
    };

    const handleCancel = () => {
        navigate(`/community/detail/${id}`);
    };

    if (loading) return <StatusText>불러오는 중...</StatusText>;
    if (!postData) return <StatusText>게시글을 찾을 수 없습니다.</StatusText>;

    return (
        <Wrapper>
            <PostForm
                isCreate={false}
                defaultTitle={postData.postTitle}
                defaultCategory={CATEGORY_ID_TO_NAME[postData.categoryId]}
                defaultContent={postData.postContent}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    padding-top: 31px;
    padding-bottom: 31px;
    width: 100%;
    ${flexCenterColumn}
`

const StatusText = styled.div`
    width: 100%;
    padding: 100px 0;
    text-align: center;
    font-size: 16px;
`

export default CommunityEditContainer;