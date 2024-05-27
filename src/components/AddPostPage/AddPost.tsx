import React, { useState } from "react";
import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { formatISO } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addpost.css"; // Import file CSS mới
import { useNavigate } from "react-router-dom";
import Navbar from "../HomePage/Navbar/Navbar";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formTailLayout = {
  wrapperCol: { span: 24, offset: 0 },
};

interface FormData {
  title: string;
  image: string;
  status: string;
  video?: string;
  urlTag: string;
  description: string;
}

const AddPost: React.FC = () => {
  const [form] = Form.useForm();
  const [statusOptions] = useState(["Published", "Draft"]);
  const navigate = useNavigate(); // Initialize useNavigate
  const defaultImage = "https://via.placeholder.com/300?text=No+Image"; // Placeholder image URL
  const rules = [{ required: true, message: "Please input the title" },
  { max: 4, message: 'abc', }]
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image: "" || defaultImage,
    status: "",
    video: "",
    urlTag: "",
    description: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      await form.validateFields();
      const now = formatISO(new Date());
      const postData = {
        ...formData,
        createdAt: now,
        updatedAt: now,
      };
      await axios.post("https://664f16ddfafad45dfae24968.mockapi.io/api/v1/postManagement", postData);
      toast.success("Add post successfully");
      navigate("/dashboard/management-posts"); // Redirect to dashboard after successful submission
    } catch (errorInfo) {
      toast.error("Failed to add post.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="form-container">
          <h1 className="page-title">Create New Post</h1>
          <Form form={form} name="dynamic_rule" style={{ marginRight: "15rem" }}>
            <div className="form-row">
              <div className="form-item">
                <Form.Item
                  {...formItemLayout}
                  name="title"
                  label="Title"
                  rules={rules}
                >
                  <Input value={formData.title} onChange={onChange} name="title" placeholder="Please input the title" />
                </Form.Item>
              </div>
              <div className="form-item">
                <Form.Item
                  {...formItemLayout}
                  name="image"
                  label="Image"
                  rules={[{ required: true, message: "Please input the image URL" }]}
                >
                  <Input
                    value={formData.image}
                    onChange={onChange}
                    name="image"
                    placeholder="Please input the image URL"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <Form.Item
                  {...formItemLayout}
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: "Please select the status" }]}
                >
                  <Select
                    value={formData.status}
                    onChange={(value) => setFormData({ ...formData, status: value })}
                    placeholder="Please select the status"
                  >
                    {statusOptions.map((status) => (
                      <Select.Option key={status} value={status}>
                        {status}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="form-item">
                <Form.Item {...formItemLayout} name="video" label="Video">
                  <Input
                    value={formData.video}
                    onChange={onChange}
                    name="video"
                    placeholder="Please input the video URL (optional)"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="form-row">
              <div className="form-item">
                <Form.Item
                  {...formItemLayout}
                  name="urlTag"
                  label="URL Tag"
                  rules={[{ required: true, message: "Please input the URL tag" }]}
                >
                  <Input
                    value={formData.urlTag}
                    onChange={onChange}
                    name="urlTag"
                    placeholder="Please input the URL tag"
                  />
                </Form.Item>
              </div>
              <div className="form-item">
                <Form.Item
                  {...formItemLayout}
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: "Please input the description" }]}
                >
                  <Input.TextArea
                    value={formData.description}
                    onChange={onChange}
                    name="description"
                    placeholder="Please input the description"
                    rows={6}
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item {...formTailLayout} className="text-center" style={{ marginLeft: "15rem" }}>
              <Button type="primary" onClick={onSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <ToastContainer />
      </main>
    </>
  );
};

export default AddPost;
