import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import Masonry from 'react-masonry-css';
import { animateScroll as scroll } from 'react-scroll';
import {
  Row,
  Col,
  Card,
  Icon,
  Avatar,
  Typography,
  Empty,
  Button,
  List,
  Spin,
} from 'antd';
import { getUser, clearUser } from '../../actions/user';
import FromIcon from '../Posts/FromIcon';
import Post from '../Posts/WallPost';

const { Text } = Typography;

const User = ({ match, auth, getUser, clearUser, user, userLoading }) => {
  const [owner] = useState(match.params.id === auth.user._id);

  useEffect(() => {
    clearUser();
    getUser(match.params.id, owner);
    scroll.scrollToTop();
  }, [getUser, clearUser, match, owner]);

  if (userLoading || !user) {
    return (
      <div className="spinWrapper">
        <Spin tip="Loading..." size="large" className="spin" />
      </div>
    );
  }

  const action = [];
  if (owner) {
    action.push(
      <Button type="link" size="small">
        <Icon type="edit" key="edit" />
        &nbsp;Edit
      </Button>,
    );
  }
  if (user.who === 'stranger') {
    action.push(
      <Button type="link" size="small">
        <Icon type="user-add" key="user-add" />
        &nbsp;Add to friends
      </Button>,
    );
  }

  let genderColor = '#b0b0b0';
  if (user.gender === 'male') {
    genderColor = '#1890ff';
  } else if (user.gender === 'female') {
    genderColor = '#ff6584';
  }

  return (
    <Row gutter={24} style={{ margin: '0 auto', maxWidth: '1400px' }}>
      <Col xl={6} lg={8} md={10} sm={10} span={24}>
        <Card
          title={user.name}
          extra={<FromIcon from={user.who} what="user" />}
          actions={action}
        >
          <img
            src={`/images/users/${user.photo}`}
            alt={user.name}
            style={{
              width: '100%',
              maxWidth: 250,
              borderRadius: '50%',
              border: `5px solid ${genderColor}`,
              margin: '0 auto 24px',
              display: 'block',
            }}
          />
          <List
            dataSource={[
              <>
                <Text strong>
                  <Icon type="calendar" />
                  &nbsp;Age:
                </Text>
                &nbsp;
                <Moment fromNow ago>
                  {user.birthDate}
                </Moment>
              </>,
              <>
                <Text strong>
                  <Icon type="compass" />
                  &nbsp;City:
                </Text>
                &nbsp;{user.city}
              </>,
              <>
                <Text strong>
                  <Icon type="environment" />
                  &nbsp;Country:
                </Text>
                &nbsp;{user.country}
              </>,
              <>
                <div>
                  <Text strong>
                    <Icon type="idcard" />
                    &nbsp;About:
                  </Text>
                  <br />
                  {user.bio}
                </div>
              </>,
            ]}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </Card>
        <Card
          style={{ margin: '24px 0' }}
          title="Friends"
          extra={user.friendsCount}
          actions={[
            <Button type="link" size="small">
              <Icon type="team" key="allfriends" />
              &nbsp;Show all friends
            </Button>,
          ]}
        >
          <List
            dataSource={user.friends}
            renderItem={friend => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size="large"
                      src={`/images/users/${friend.photo}`}
                    />
                  }
                  title={
                    <Link to={`/user/${friend.userId}`}>{friend.name}</Link>
                  }
                  description={
                    <Moment fromNow ago>
                      {friend.since}
                    </Moment>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col xl={18} lg={16} md={14} sm={14} span={24}>
        {user.posts.length === 0 ? (
          <Empty style={{ marginBottom: 24 }} />
        ) : (
          <Masonry
            breakpointCols={{
              default: 2,
              992: 1,
              768: 1,
            }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {user.posts.map(post => (
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
                  from: user.who,
                  privacy: post.privacy,
                  state: post.state,
                  likes: post.likes,
                }}
                what="profile"
                key={post._id}
              />
            ))}
          </Masonry>
        )}
        <Button
          style={{ display: 'block', maxWidth: 400, margin: '0 auto' }}
          type="primary"
          disabled={user.posts.length === 0}
          loading={userLoading}
          block
        >
          Show all posts
        </Button>
      </Col>
    </Row>
  );
};

User.defaultProps = {
  user: {},
};

User.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
  userLoading: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.any),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  getUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  userLoading: state.user.loading,
  user: state.user.user,
});

export default connect(
  mapStateToProps,
  { getUser, clearUser },
)(withRouter(User));
