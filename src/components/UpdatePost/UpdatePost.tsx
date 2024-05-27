// src/pages/dashboard/UpdatePost.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, Select, message } from "antd";
import Navbar from "../HomePage/Navbar/Navbar";

interface DataType {
  id: string;
  title: string;
  description: string;
  image: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  url_tag: string;
  status: string;
}

const { Option } = Select;

const UpdatePost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<DataType | null>(null);
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");
  const [urlTag, setUrlTag] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://664f16ddfafad45dfae24968.mockapi.io/api/v1/postManagement/${id}`);
        const data = response.data;
        setPost(data);
        setImage(data.image);
        setVideo(data.video);
        setUrlTag(data.url_tag);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (values: any) => {
    try {
      const updatedPost = {
        ...values,
        image,
        video,
        url_tag: urlTag,
        updatedAt: new Date().toISOString(),
      };
      await axios.put(`https://664f16ddfafad45dfae24968.mockapi.io/api/v1/postManagement/${id}`, updatedPost);
      message.success("Post updated successfully");
      navigate("/dashboard/management-posts");
    } catch (error) {
      message.error("Failed to update post");
      console.error("Failed to update post:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (

    <>
      <Navbar />
      <h1 className="page-title">Update Post</h1>
      <Form
        initialValues={post}
        onFinish={handleUpdate}
        layout="vertical"
        style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the title!" }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status!" }]}>
          <Select>
            <Option value="Published">Published</Option>
            <Option value="Draft">Draft</Option>
          </Select>
        </Form.Item>
        <Form.Item name="urlTag" label="URL Tag" rules={[{ required: true, message: "Please input the URL tag!" }]}>
          <Input value={urlTag} onChange={(e) => setUrlTag(e.target.value)} />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
        </Form.Item>
        <Form.Item name="video" label="Video">
          <Input value={video} onChange={(e) => setVideo(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Post
          </Button>
        </Form.Item>
      </Form></>

  );
};

export default UpdatePost;
