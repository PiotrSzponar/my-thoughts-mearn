import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-css';
import { useMediaQuery } from 'react-responsive';
import { Row, Col, Empty, Button, Spin, Radio, Icon } from 'antd';
import Post from '../Posts/WallPost';
import { getPosts, clearPosts } from '../../actions/post';

const Feed = ({ post: { posts, loading, noData }, getPosts, clearPosts }) => {
  const [page, setPage] = useState(2);
  const [firstLoad, setFirstLoad] = useState(true);
  const [sort, setSort] = useState(localStorage.sort || 'createdAt');

  const sm = useMediaQuery({ minDeviceWidth: 576 });
  const md = useMediaQuery({ minDeviceWidth: 768 });

  useEffect(() => {
    clearPosts();
    getPosts(1, localStorage.sort);
  }, [getPosts, clearPosts]);

  const handleSort = type => {
    localStorage.setItem('sort', type);
    setSort(type);
    clearPosts();
    getPosts(1, localStorage.sort);
  };

  const handlePagination = pageNum => {
    setFirstLoad(false);
    getPosts(page, sort);
    setPage(pageNum + 1);
  };

  if (loading && firstLoad) {
    return (
      <div className="spinWrapper">
        <Spin tip="Loading..." size="large" className="spin" />
      </div>
    );
  }

  return (
    <div style={{ margin: '0 auto', maxWidth: '1400px' }}>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Radio.Group
            onChange={e => handleSort(e.target.value)}
            defaultValue={sort}
            style={{ marginBottom: md ? 20 : 10, float: sm ? 'right' : 'none' }}
          >
            <Radio.Button value="createdAt">
              <Icon type="calendar" /> &nbsp;New posts
            </Radio.Button>
            <Radio.Button value="likes">
              <Icon type="like" /> &nbsp;Top liked
            </Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      {noData && firstLoad ? (
        <Empty style={{ marginBottom: 24 }} />
      ) : (
        <Masonry
          breakpointCols={{
            default: 3,
            992: 2,
            768: 1,
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
                date: post.createdAt,
                title: post.title,
                photos: post.photos,
                content: post.content,
                tags: post.tags,
                from: post.from,
                privacy: post.privacy,
                state: post.state,
                likes: post.likes,
              }}
              key={post._id}
            />
          ))}
        </Masonry>
      )}
      <Button
        style={{ display: 'block', maxWidth: 400, margin: '0 auto' }}
        type="primary"
        disabled={noData}
        loading={loading}
        onClick={() => handlePagination(page)}
        block
      >
        Load more...
      </Button>
    </div>
  );
};

Feed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  clearPosts: PropTypes.func.isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  { getPosts, clearPosts },
)(Feed);
