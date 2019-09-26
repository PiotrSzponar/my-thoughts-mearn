import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { animateScroll as scroll } from 'react-scroll';
import Moment from 'react-moment';
import {
  Row,
  Col,
  Card,
  Icon,
  Button,
  Typography,
  Spin,
  Avatar,
  Tag,
} from 'antd';
import Photo from './Photo';
import FromIcon from './FromIcon';
import { getPost, likePost } from '../../actions/post';

const { Title, Text, Paragraph } = Typography;

const Post = ({ match, getPost, likePost, post: { post, loading } }) => {
  useEffect(() => {
    getPost(match.params.id);
    scroll.scrollToTop();
  }, [getPost, match]);

  const sm = useMediaQuery({ minDeviceWidth: 576 });
  const md = useMediaQuery({ minDeviceWidth: 768 });
  const lg = useMediaQuery({ minDeviceWidth: 992 });
  const xl = useMediaQuery({ minDeviceWidth: 1200 });
  const xxl = useMediaQuery({ minDeviceWidth: 1600 });

  if (loading || !post) {
    return (
      <div className="spinWrapper">
        <Spin tip="Loading..." size="large" className="spin" />
      </div>
    );
  }

  return (
    <Card
      className="row"
      actions={
        post.from === 'myself'
          ? [
              <Button type="link" size="small">
                <Icon type="edit" key="edit" />
                &nbsp;Edit
              </Button>,
              <Button type="link" size="small">
                <Icon type="delete" key="delete" />
                &nbsp;Delete
              </Button>,
            ]
          : [
              <Button
                type="link"
                block
                size="small"
                onClick={() => likePost(post._id)}
              >
                <Icon type="like" key="like" />
                {post.likes.length > 0 && <>&nbsp;{post.likes.length}</>}
              </Button>,
            ]
      }
    >
      <Row>
        <Col sm={16} span={24}>
          <Title level={3} style={{ textAlign: sm ? 'left' : 'center' }}>
            {post.title}&nbsp;
            {post.privacy === 'private' && (
              <Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
            )}
            {post.state === 'draft' && <Text type="secondary">(draft)</Text>}
          </Title>
        </Col>
        <Col
          sm={8}
          span={24}
          style={{
            textAlign: sm ? 'right' : 'center',
            marginBottom: sm ? 0 : 20,
          }}
        >
          <Link to={`/user/${post.author._id}`}>
            <Avatar src={`/images/users/${post.author.photo}`} />
            <span
              style={{
                verticalAlign: 'middle',
                color: 'rgba(0, 0, 0, 0.85)',
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              &nbsp; {post.author.name}
            </span>
          </Link>
        </Col>
      </Row>
      <Row type="flex" gutter={24}>
        {post.photos.length > 0 ? (
          <Col md={12} span={24}>
            <Photo photos={post.photos} title={post.title} postId={post._id} />
            {md ? null : <br />}
          </Col>
        ) : (
          false
        )}
        <Col
          md={post.photos.length > 0 ? 12 : 24}
          span={24}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              overflowY: 'auto',
              height:
                (post.photos.length === 0 && 'auto') ||
                (xxl && 600) ||
                (xl && 450) ||
                (lg && 350) ||
                (md && 240),
            }}
          >
            <Paragraph>{post.content}</Paragraph>
          </div>
          <div>
            {post.tags.map(tag => (
              <Tag key={`${tag}-${post._id}`}>
                <Link to={`/tag/${tag}`}>{tag}</Link>
              </Tag>
            ))}
            <Text
              type="secondary"
              style={{ display: 'block', textAlign: 'right' }}
            >
              <FromIcon from={post.from} /> &nbsp;
              <Moment
                interval={30000}
                fromNow
                withTitle
                titleFormat="YYYY-MM-DD HH:mm"
              >
                {post.createdAt}
              </Moment>
            </Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  { getPost, likePost },
)(withRouter(Post));
