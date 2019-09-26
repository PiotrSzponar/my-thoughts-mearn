import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Card, Icon, Avatar, Typography, Tag, Button } from 'antd';
import FromIcon from './FromIcon';
import Photo from './Photo';
import { likePosts } from '../../actions/post';

const { Text, Title, Paragraph } = Typography;

const Post = ({ author, post, likePosts }) => (
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
        <FromIcon from={post.from} /> &nbsp;
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
      post.from !== 'myself' && [
        <Button
          type="link"
          size="small"
          block
          onClick={() => likePosts(post.id)}
        >
          <Icon type="like" key="like" />
          {post.likes.length > 0 && <>&nbsp;{post.likes.length}</>}
        </Button>,
      ]
    }
  >
    <Title level={4}>
      <Link style={{ color: 'inherit' }} to={`/post/${post.id}`}>
        {post.privacy === 'private' && (
          <>
            <Icon type="lock" style={{ color: 'rgba(0, 0, 0, 0.45)' }} /> &nbsp;
          </>
        )}
        {post.title}
        {post.state === 'draft' && <Text type="secondary"> (draft)</Text>}
      </Link>
    </Title>
    <Paragraph ellipsis={{ rows: 5, expandable: true }}>
      {post.content}
    </Paragraph>
    {post.tags.map(tag => (
      <Tag key={`${tag}-${post.id}`}>
        <Link to={`/tag/${tag}`}>{tag}</Link>
      </Tag>
    ))}
  </Card>
);

Post.propTypes = {
  author: PropTypes.objectOf(PropTypes.string).isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  likePosts: PropTypes.func.isRequired,
};

export default connect(
  null,
  { likePosts },
)(Post);
