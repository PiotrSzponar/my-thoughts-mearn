import React from 'react';
import Post from '../Post/Post';

const posts = [
  {
    photos: ['post-5d8a01bb766b015f00ceacc3-1569325499979-1.jpeg'],
    tags: ['two'],
    privacy: 'public',
    state: 'publish',
    _id: '5d8a01bb766b015f00ceacc3',
    title: "I'm from Barcelona",
    content:
      'Pellentesque venenatis elit quis turpis suscipit semper. Fusce ac nisi sodales, rutrum risus ac, gravida orci. Integer cursus odio eu nibh rhoncus laoreet. Proin egestas mollis lorem eu pellentesque. In hac habitasse platea dictumst. Maecenas maximus mauris vel nisl pretium feugiat. Quisque vulputate nunc maximus nisi blandit bibendum. Integer ultricies sapien vitae sapien dignissim consequat. Nunc vehicula porttitor augue vel tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In ac velit nibh. Phasellus tempor massa in tempor porta. Maecenas vestibulum, felis quis tristique dignissim, nisi mi semper diam, quis ullamcorper sapien enim imperdiet nisl.',
    author: {
      photo: 'user-5d89f9b3766b015f00ceacbd-1569323899621.jpeg',
      _id: '5d89f9b3766b015f00ceacbd',
      name: 'Miguel Terrell',
    },
    createdAt: '2019-09-24T11:44:59.921Z',
    updatedAt: '2019-09-24T11:45:00.277Z',
    __v: 1,
    from: 'stranger',
  },
  {
    photos: ['post-5d8a00dd766b015f00ceacc2-1569325278033-1.jpeg'],
    tags: ['three'],
    privacy: 'friends',
    state: 'publish',
    _id: '5d8a00dd766b015f00ceacc2',
    title: 'I am in paradise!',
    content:
      'Vestibulum dui dolor, venenatis eget nunc ut, vestibulum blandit magna.',
    author: {
      photo: 'user-5d89f98a766b015f00ceacbc-1569323788194.jpeg',
      _id: '5d89f98a766b015f00ceacbc',
      name: 'Ethan Lester',
    },
    createdAt: '2019-09-24T11:41:17.973Z',
    updatedAt: '2019-09-24T11:41:18.036Z',
    __v: 1,
    from: 'friend',
  },
  {
    photos: ['post-5d8a0068766b015f00ceacc1-1569325160521-1.jpeg'],
    tags: ['one'],
    privacy: 'public',
    state: 'draft',
    _id: '5d8a0068766b015f00ceacc1',
    title: 'Recipe for a healthy shake',
    content:
      'Duis accumsan aliquet tempus. Praesent in gravida massa. Praesent a euismod nisl. Vivamus et aliquam dui, ac posuere elit. Curabitur sodales eros vel ante pellentesque, et posuere nulla placerat. Cras et quam sem. Nunc sodales dui ante, at bibendum enim vulputate ac. Nulla rhoncus sapien vitae dolor mattis, id bibendum velit eleifend. Nam imperdiet lectus eget elit blandit lacinia. Suspendisse iaculis, arcu nec semper sodales, felis velit sagittis lorem, non dignissim ex ex non ex. Aliquam sollicitudin enim at blandit accumsan. Praesent interdum, enim nec bibendum placerat, enim arcu malesuada dui, vel gravida est nulla quis ante. Sed vehicula lacus vehicula iaculis volutpat. Aliquam ullamcorper leo augue, nec ultricies ipsum tincidunt non.',
    author: {
      photo: 'user-5d89f956766b015f00ceacbb-1569323629599.jpeg',
      _id: '5d89f956766b015f00ceacbb',
      name: 'Karen Norris',
    },
    createdAt: '2019-09-24T11:39:20.461Z',
    updatedAt: '2019-09-24T11:39:20.524Z',
    __v: 1,
    from: 'myself',
  },
  {
    photos: [],
    tags: [],
    privacy: 'private',
    state: 'publish',
    _id: '5d89ffec766b015f00ceacc0',
    title: 'My thoughts about...',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit, sapien eu aliquam lobortis, mauris lacus ultrices sem, a ultrices felis turpis dictum nibh. Nam feugiat urna nisi, non fringilla nibh consectetur at. Pellentesque venenatis elit quis turpis suscipit semper. Fusce ac nisi sodales, rutrum risus ac, gravida orci.',
    author: {
      photo: 'user-5d89f956766b015f00ceacbb-1569323629599.jpeg',
      _id: '5d89f956766b015f00ceacbb',
      name: 'Karen Norris',
    },
    createdAt: '2019-09-24T11:37:16.349Z',
    updatedAt: '2019-09-24T11:37:16.349Z',
    __v: 0,
    from: 'myself',
  },
  {
    photos: [
      'post-5d89ff82766b015f00ceacbf-1569324930598-1.jpeg',
      'post-5d89ff82766b015f00ceacbf-1569324930598-2.jpeg',
    ],
    tags: ['one', 'two'],
    privacy: 'friends',
    state: 'publish',
    _id: '5d89ff82766b015f00ceacbf',
    title: 'I want to buy this moto!',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit, sapien eu aliquam lobortis, mauris lacus ultrices sem, a ultrices felis turpis dictum nibh.',
    author: {
      photo: 'user-5d89f956766b015f00ceacbb-1569323629599.jpeg',
      _id: '5d89f956766b015f00ceacbb',
      name: 'Karen Norris',
    },
    createdAt: '2019-09-24T11:35:30.542Z',
    updatedAt: '2019-09-24T11:35:30.601Z',
    __v: 1,
    from: 'myself',
  },
  {
    photos: ['post-5d89fd96766b015f00ceacbe-1569324438950-1.jpeg'],
    tags: ['one', 'two', 'three'],
    privacy: 'public',
    state: 'publish',
    _id: '5d89fd96766b015f00ceacbe',
    title: 'My trip to Japan',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit, sapien eu aliquam lobortis, mauris lacus ultrices sem, a ultrices felis turpis dictum nibh. Nam feugiat urna nisi, non fringilla nibh consectetur at. Pellentesque venenatis elit quis turpis suscipit semper. Fusce ac nisi sodales, rutrum risus ac, gravida orci. Integer cursus odio eu nibh rhoncus laoreet. Proin egestas mollis lorem eu pellentesque. In hac habitasse platea dictumst. Maecenas maximus mauris vel nisl pretium feugiat. Quisque vulputate nunc maximus nisi blandit bibendum. Integer ultricies sapien vitae sapien dignissim consequat. Nunc vehicula porttitor augue vel tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In ac velit nibh. Phasellus tempor massa in tempor porta. Maecenas vestibulum, felis quis tristique dignissim, nisi mi semper diam, quis ullamcorper sapien enim imperdiet nisl.',
    author: {
      photo: 'user-5d89f956766b015f00ceacbb-1569323629599.jpeg',
      _id: '5d89f956766b015f00ceacbb',
      name: 'Karen Norris',
    },
    createdAt: '2019-09-24T11:27:18.715Z',
    updatedAt: '2019-09-24T11:27:18.955Z',
    __v: 1,
    from: 'myself',
  },
];

const Feed = () => {
  return (
    <div style={{ margin: '0 auto', maxWidth: 600 }}>
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
    </div>
  );
};

export default Feed;
