import React from "react";
import MyCommunityPostCard from "./MyCommunityPostCard"; 

const PostGridSectionComponent = ({ posts = [], selectedIds = [], onSelectOne, onNavigateOne, styles }) => {
  const Grid = styles?.PostGrid || "div"; 

  return (
    <Grid>
      {posts.map((post) => {
        const isSelected = selectedIds.includes(post.id);

        return (
          <div key={post.id}>
            <MyCommunityPostCard
              post={post}
              isSelected={isSelected}
              onSelect={() => onSelectOne?.(post.id)}
              onNavigate={() => onNavigateOne?.(post.id)} 
            />
          </div>
        );
      })}
    </Grid>
  );
};

export default PostGridSectionComponent;