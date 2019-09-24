import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Card, Icon, Avatar, Typography, Tag } from 'antd';
import Photo from './Photo';

const { Text, Title, Paragraph } = Typography;

const Post = ({ author, post }) => (
  <Card
    style={{ marginBottom: 24 }}
    title={
      <Link to={`/user/${author.id}`}>
        <Avatar src={`/images/users/${author.photo}`} />
        <span style={{ verticalAlign: 'middle', color: 'rgba(0, 0, 0, 0.85)' }}>
          &nbsp; {author.name}
        </span>
      </Link>
    }
    extra={
      <Text type="secondary">
        <Moment
          interval={30000}
          fromNow
          withTitle
          titleFormat="YYYY-MM-DD HH:mm"
        >
          {post.date}
        </Moment>
      </Text>
    }
    cover={
      post.photos.length > 0 ? (
        <Photo photos={post.photos} title={post.title} postId={post.id} />
      ) : (
        false
      )
    }
    actions={
      post.from === 'friend'
        ? [
            <div>
              <Icon type="like" key="like" /> 1
            </div>,
          ]
        : [
            <div>
              <Icon type="like" key="like" /> 1
            </div>,
            <div>
              <Icon type="user-add" key="add-friend" /> Add to friend
            </div>,
          ]
    }
  >
    <Title level={4}>{post.title}</Title>
    <Paragraph ellipsis={{ rows: 5, expandable: true }}>
      {post.content}
    </Paragraph>
    {post.tags.map(tag => (
      <Tag key={`${tag}-${post.id}`}>
        <Link to={`/tag/${tag}`}>#{tag}</Link>
      </Tag>
    ))}
  </Card>
);

Post.propTypes = {};

export default Post;
