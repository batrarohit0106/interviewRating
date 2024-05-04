import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Card, Form, Input, Typography, Button, Select} from "antd"
import FileBase64 from "react-file-base64"
import styles from './styles'
import {createRating, editRating} from '../../actions/ratings'
import { Link } from "react-router-dom"
import {Rate } from 'antd';

const {Title} = Typography;

function RatingForm({ selectedId, setSelectedId }){
  const rating = useSelector((state)=> selectedId ? state.ratings.find(rating => rating.id === selectedId): null);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?.id;

  const onSubmit = (formValues) => {
    console.log(selectedId)
    selectedId ?
    dispatch(editRating(selectedId, {...formValues, userId})) :
    dispatch(createRating({...formValues, userId}));
    reset();
  };

  useEffect(()=>{
    if(rating){
      form.setFieldsValue(rating);
    }
  }, [rating, form]);

  const reset = () => {
    form.resetFields();
    setSelectedId(null);
  }
if(!user){
  return (
    <Card style={styles.formCard}>
      <Title level={4}>
        <span style={styles.formTitle}>
          Welcome to The Bibliophile's Corner!
        </span><br/>
        Please <Link to="/authform">login</Link> or {" "}
        <Link to="/authform">register</Link> to add a rating.
      </Title>
    </Card>
  );
}

  return (
    <Card
      style = {styles.formCard}
      title={
        <Title level={4} style={styles.formTitle}>
          {selectedId ? "Edit" : "Add"} Rating
        </Title>
      }
    >
      <Form
        form={form}
        labelCol={{span: 6}}
        wrapperCol={{span: 16}}
        layout='horizontol'
        size="middle"
        onFinish={onSubmit}
      >
        
        <Form.Item name="name" label="Name" style={styles.label} rules={[{required: true}]}>
          <Input allowClear/>
        </Form.Item>
        
        <Form.Item name="contact" label="Contact" style={styles.label} rules={[{required: true}]}>
          <Input allowClear/>
        </Form.Item>
        
        <Form.Item name="interviewStatus" label="Status" style={styles.label} rules={[{required: true}]}>
          <Select type="number"  placeholder="Select a status" allowClear>
            <option value="Pending">Pending</option>
            <option value="1st Round">1st Round</option>
            <option value="2nd Round">2nd Round</option>
            <option value="Completed">Completed</option>
          </Select>
        </Form.Item>
        {/* <Form.Item name="rating" label="Rating" style={styles.label} rules={[{required: true}]}>
        <Select placeholder="Select a rating" allowClear>
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </Select>
        </Form.Item> */}
        <Form.Item name="rating" label="Rating" style={styles.label} rules={[{required: true}]}>
  <Rate allowClear />
</Form.Item>
        <Form.Item name="feedback" label="Feedback" style={styles.label} rules={[{required: true}]}>
          <Input.TextArea allowClear autoSize={{minRows: 2, maxRows: 6}}/>
        </Form.Item>
        {/* <Form.Item name="image" label="Image" style={styles.label} rules={[{required: true}]}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={(e)=>{
              form.setFieldsValue({
                image: e.base64
              })
            }}
          />
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6
          }}
          >
          <Button type="primary" style={styles.button} block htmlType='submit'>
            Add Rating
          </Button>
          </Form.Item>
        {!selectedId ? null : 
          <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6
          }}
          >
          <Button type="primary" style={styles.button} block htmlType='button' onClick={reset}>
            Discard
          </Button>
          </Form.Item>
        }
      </Form>
    </Card>
  )
}

export default RatingForm