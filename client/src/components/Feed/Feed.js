import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-css';
import { Empty, Button, Icon, Spin } from 'antd';
import { animateScroll as scroll } from 'react-scroll';
import Post from '../Posts/WallPost';
import { getPosts } from '../../actions/post';

const ButtonGroup = Button.Group;

const Feed = ({ post: { posts, loading }, getPosts }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPosts(page);
  }, [getPosts, page]);

  const handlePagination = (type, pageNum) => {
    if (type === 'next') {
      setPage(pageNum + 1);
      getPosts(page);
    } else {
      setPage(pageNum - 1);
      getPosts(page);
    }
    scroll.scrollToTop();
  };

  if (loading) {
    return (
      <div className="spinWrapper">
        <Spin tip="Loading..." size="large" className="spin" />
      </div>
    );
  }

  return (
    <div style={{ margin: '0 auto', maxWidth: '1400px' }}>
      {posts.length === 0 ? (
        <Empty style={{ marginBottom: 24 }} />
      ) : (
        <Masonry
          breakpointCols={{
            default: 3,
            992: 2,
            576: 1,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map(post => (
            <Post
              author={{
                id: post.author._id,
                name: post.author.name,
                photo: post.author.photo,
              }}
              post={{
                id: post._id,
                date: post.updatedAt,
                title: post.title,
                photos: post.photos,
                content: post.content,
                tags: post.tags,
                from: post.from,
                privacy: post.privacy,
                state: post.state,
              }}
              key={post._id}
            />
          ))}
        </Masonry>
      )}
      <ButtonGroup style={{ display: 'block', textAlign: 'center' }}>
        <Button
          type="primary"
          disabled={page === 1}
          onClick={() => handlePagination('prev', page)}
        >
          <Icon type="left" />
          Previous
        </Button>
        <Button
          type="primary"
          disabled={posts.length === 0}
          onClick={() => handlePagination('next', page)}
        >
          Next
          <Icon type="right" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

Feed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  { getPosts },
)(Feed);
