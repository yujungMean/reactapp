import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';


const MyPageContainer = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default MyPageContainer;