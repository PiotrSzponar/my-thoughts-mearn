import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { animateScroll as scroll } from 'react-scroll';
import {
  Row,
  Col,
  Divider,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Icon,
  Button,
  Typography,
  Spin,
} from 'antd';
import { setAlert } from '../../actions/alert';
import { loadUser } from '../../actions/auth';
import styles from './Complete.module.scss';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CompleteForm = ({ form, setAlert, loadUser, user }) => {
  const { getFieldDecorator } = form;
  const [loading, setLoading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(
    user.photo === 'default.jpg' ? '' : user.photo,
  );
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoMsg, setPhotoMsg] = useState('');

  if (user.isCompleted) {
    return <Redirect to="/feed" />;
  }

  const sendComplete = async values => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(values);

    setLoading(true);

    try {
      await axios.patch('/api/users/signup/complete', body, config);

      setLoading(false);
      loadUser();
    } catch (err) {
      const errors = err.response.data.message.split('\n');
      errors.forEach(error => setAlert(error, 'fail'));
      setLoading(false);
    }
  };

  const sendPhoto = async ({ file }) => {
    const formData = new FormData();
    formData.append('photo', file);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    setPhotoUrl('');
    setPhotoLoading(true);
    try {
      const res = await axios.patch(
        '/api/users/me/upload-photo',
        formData,
        config,
      );
      setPhotoLoading(false);
      setPhotoUrl(res.data.data.photo);
    } catch (err) {
      const errors = err.response.data.message.split('\n');
      errors.forEach(error => setAlert(error, 'fail'));
      setPhotoLoading(false);
    }
  };

  const deletePhoto = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setPhotoUrl('');
    setPhotoLoading(true);
    try {
      const res = await axios.delete('/api/users/me/delete-photo', config);
      setPhotoLoading(false);
      setPhotoUrl(res.data.data.photo);
    } catch (err) {
      const errors = err.response.data.message.split('\n');
      errors.forEach(error => setAlert(error, 'fail'));
      setPhotoLoading(false);
    }
  };

  const beforePhotoUpload = file => {
    setPhotoMsg('');
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      setPhotoMsg(`${photoMsg}You can only upload JPG/PNG file. `);
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      setPhotoMsg(`${photoMsg}Image must smaller than 3MB. `);
    }

    return isJpgOrPng && isLt3M;
  };

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        sendComplete(values);
      }
    });
  };

  return (
    <Spin spinning={loading}>
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
          <Card>
            <Title level={2}>
              <Icon type="edit" /> Complete Profile
            </Title>
            <Text>
              We&apos;re grateful that you&apos;ve created the new account. To
              improve your experience, please complete your profile with the
              required data.
            </Text>
            <Divider>Required</Divider>
            <Form onSubmit={handleSubmit}>
              <Form.Item hasFeedback>
                {form.getFieldDecorator('name', {
                  initialValue: user.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input your nickname!',
                      whitespace: true,
                    },
                  ],
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Your name"
                  />,
                )}
              </Form.Item>
              <Row gutter={16}>
                <Col span={24} sm={12}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('birthDate', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your birth date!',
                        },
                      ],
                    })(
                      <DatePicker
                        placeholder="Select your birth date"
                        style={{ width: '100%' }}
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator('gender', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select your gender!',
                        },
                      ],
                    })(
                      <Select placeholder="Select your gender">
                        <Option value="female">Female</Option>
                        <Option value="male">Male</Option>
                        <Option value="other">Other</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ margin: 0 }}>
                <Divider style={{ marginTop: 0 }}>Optional</Divider>
              </Form.Item>
              <Form.Item hasFeedback>
                {form.getFieldDecorator('bio', {
                  rules: [
                    {
                      max: 250,
                      message: 'Please, reduce the text to 250 characters.',
                      whitespace: true,
                    },
                  ],
                })(
                  <TextArea
                    autosize={{ minRows: 2, maxRows: 6 }}
                    placeholder="Write something about you..."
                  />,
                )}
              </Form.Item>
              <Row gutter={16}>
                <Col span={24} sm={12}>
                  <Form.Item>
                    {getFieldDecorator('city', {
                      rules: [
                        {
                          max: 50,
                          message: 'Max 50 characters.',
                        },
                      ],
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="compass"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="Your city"
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col span={24} sm={12}>
                  <Form.Item>
                    {getFieldDecorator('country', {
                      rules: [
                        {
                          max: 50,
                          message: 'Max 50 characters.',
                        },
                      ],
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="environment"
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder="Your country"
                      />,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Row gutter={16}>
                  <Col span={24} sm={16}>
                    <Title level={4}>Upload your photo</Title>
                    <Text type="secondary">
                      Please select up to 3MB photo only.
                    </Text>
                    <br />
                    <Button
                      onClick={deletePhoto}
                      type="danger"
                      size="small"
                      ghost
                    >
                      <Icon type="delete" /> Remove photo
                    </Button>
                  </Col>
                  <Col span={24} sm={8} style={{ textAlign: 'center' }}>
                    <Upload
                      name="photo"
                      accept="image/*"
                      listType="picture-card"
                      showUploadList={false}
                      customRequest={sendPhoto}
                      beforeUpload={beforePhotoUpload}
                      className={styles.photoUploader}
                    >
                      {photoUrl ? (
                        <img src={`/images/users/${photoUrl}`} alt="avatar" />
                      ) : (
                        <div>
                          <Icon type={photoLoading ? 'loading' : 'plus'} />
                          <div className="ant-upload-text">Upload</div>
                        </div>
                      )}
                    </Upload>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  onClick={() => scroll.scrollToTop()}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

CompleteForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.func).isRequired,
  setAlert: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  loadUser: PropTypes.func.isRequired,
};

const Complete = Form.create({ name: 'complete' })(CompleteForm);

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { setAlert, loadUser },
)(Complete);
