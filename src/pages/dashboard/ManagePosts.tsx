import { Breadcrumb, Button, Image, Layout, Popconfirm, Table, Tag } from "antd";
import type { TableProps } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import Sidebar from "../../components/sidebar";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface DataType {
  id: string;
  title: string;
  description: string;
  image: string;
  video: string;
  createDate: string;
  updateDate: string;
  url_tag: string;
  status: string;
}

export const ManagePosts = () => {
  const [dataSource, setDatasource] = useState<DataType[]>([]);

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
      // width: "15px",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "200px",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        const color = status === "Published" ? "green" : status === "Draft" ? "volcano" : "black";
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      // width: "5%",
      render: (createDate) => format(new Date(createDate), "dd/MM/yyyy "),
    },
    {
      title: "Update Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      // width: "5%",
      render: (updatedAt) => format(new Date(updatedAt), "dd/MM/yyyy "),
    },
    {
      title: "URL Tag",
      dataIndex: "urlTag",
      key: "urlTag",
      width: "200px",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (anh) => <Image src={anh} width={100} />,
    },
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "500px",

      render: (id) => (
        <>
          <Link to={`/dashboard/updatepost/${id}`}>
            {" "}
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handelDeleteMPosts(id)}
            okText="Yes"
          >
            <Button type="primary" danger style={{ marginLeft: "10px" }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("https://664f16ddfafad45dfae24968.mockapi.io/api/v1/postManagement");
      console.log(response);
      const sortedData = response.data.sort(
        (a: DataType, b: DataType) => new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
      );

      setDatasource(sortedData);
    };
    fetchPosts();
  }, []);

  const handelDeleteMPosts = async (id: string) => {
    const response = await axios.delete(`https://664f16ddfafad45dfae24968.mockapi.io/api/v1/postManagement/${id}`);
    console.log(response);
    const listAfterDelete = dataSource.filter((post) => post.id !== id);
    setDatasource(listAfterDelete);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-1 min-h-[100vh]">
        <div className="p-5 bg-white shadow-lg flex justify-end">
          <Link to={"/addpost"}>
            <Button type="primary" style={{ width: "200px" }}>
              Add
            </Button>
          </Link>
        </div>
        <div className="py-5 px-5">
          <div>
            <Breadcrumb
              items={[
                {
                  href: "/",
                  title: <HomeOutlined />,
                },
                {
                  title: "Management Posts",
                },
              ]}
            />
          </div>
          <Table columns={columns} dataSource={dataSource} rowKey="id" />
        </div>
      </div>
    </Layout>
  );
};

export default ManagePosts;
