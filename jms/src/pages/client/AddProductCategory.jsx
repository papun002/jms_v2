import { useEffect, useState } from "react";
import React from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import InputFields from "../../components/inputFields/InputFields";
import axios from "axios";
import Toast from "../../components/alert/Toast";
import ModalComponent from "../../components/modal/ModalComponent";

function AddProductCategory() {
  const [modalCat, setModalCat] = useState(null);
  const { handlePageTitleChange } = usePageTitle();
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [catData, setCatData] = useState([]);
  const [response, setResponse] = useState(null);
  const token = localStorage.getItem("token");
  //page naming
  useEffect(() => {
    handlePageTitleChange("Category Section");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);
  //page naming end

  //inserting Category
  const handleCategory = (e) => {
    e.preventDefault();
    const cate = e.target.pdtcat.value;
    // console.log(data);
    axios
      .post("http://localhost:4000/client/cat/categoryinsert", {
        category: cate
      }, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        
        if (res.data.status === "201") {
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "success",
          });
          fetchingCategory();
        } else if (res.data.status === "400") {
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "warning",
          });
        } else {
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "error",
          });
        }
        // setCatData((prevCatData) => [...prevCatData, res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //getting category
  const fetchingCategory = async () => {
    await axios
      .get("http://localhost:4000/client/cat/getcategory",{
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);

        setCatData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingCategory();
  }, []);

  //deleting category
  const handleCatDelete = async (id) => {
    // console.log(id);
    await axios
      .delete(`http://localhost:4000/cat/deletecategory/${id}`, {
        id: id,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === "201") {
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "success",
          });
          fetchingCategory();
        }else{
          setToastVisible(true);
          setResponse({
            message: res.data.data,
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // toastVisible
  const handleCloseToast = () => {
    setToastVisible(false);
  };
  // toastVisible end

  //modal
  const openModal = (catid) => {
    setModalCat(catid);
    window.$("#staticBackdrop").modal("show");
  };
  const closeModal = () => {
    setModalCat(null);
    window.$("#staticBackdrop").modal("hide");
  };
  const editableFields = [
    { name: "_id", label: "ID", editable: false },
    { name: "cname", label: "Category Name", editable: true },
  ];
  

  const handleUpdate = (updatedUser) => {
    // Implement update logic here
    console.log("Updated user:", updatedUser);
  };

  const handleDelete = (userId, userName) => {
    // Implement delete logic here
    console.log(`Deleted user ${userName} with ID ${userId}`);
  };
//modal end
  return (
    <div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          {toastVisible && (
            <Toast
              message={response.message}
              type={response.type}
              duration={1000}
              onClose={handleCloseToast}
            />
          )}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Product Category</h3>
              <div className="card-options ">
                <a
                  href="#"
                  className="card-options-collapse"
                  data-toggle="card-collapse"
                >
                  <i className="fa fa-chevron-up"></i>
                </a>
              </div>
            </div>
            <form className="card-body" onSubmit={handleCategory}>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12">
                  <div className="row clearfix">
                    <InputFields
                      type={"text"}
                      placeholder={"Enter Category Name"}
                      name={"pdtcat"}
                      label={"Enter Category Name"}
                      classValue={"col-md-12 col-lg-12"}
                      isSearch={true}
                      suggestions={["Apple", "Banana", "Orange", "Pear"]}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div className="row clearfix">
                    <div className="col-sm-12 col-lg-12">
                      <button type="submit" className="btn btn-red w-100">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <div className="tab-pane" id="Notifications">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    Category List{" "}
                    <small>Total no of Categories: {catData.length}</small>
                  </h3>
                  <div className="card-options">
                    <a
                      href={undefined}
                      className="card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fa fa-chevron-up"></i>
                    </a>
                    <a
                      href={undefined}
                      className="card-options-fullscreen"
                      data-toggle="card-fullscreen"
                    >
                      <i className="fa fa-window-maximize"></i>
                    </a>
                  </div>
                </div>
                <div
                  className="card-body"
                  style={{ maxHeight: "320px", overflowY: "auto" }}
                >
                  {catData.map((cat, index) => (
                    <ul className="list-group" key={index}>
                      <li className="list-group-item">
                        <span className="text-muted"> {index + 1}. </span>
                        <span className="text-dark">{cat.cat_name}</span>
                        <div className="float-right">
                          {/* <span className="badge tag-warning text-dark">
                            22
                          </span> */}
                          <div className="item-action">
                            <button
                              className=" btn btn-red mr-2"
                              data-toggle="tooltip modal"
                              data-placement="top"
                              title="Edit"
                              data-target="#staticBackdrop"
                              onClick={() => openModal(cat._id)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                            <button
                              className=" btn btn-red mr-2"
                              onClick={() => handleCatDelete(cat._id)}
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
       {modalCat && (
        // <ModalComponent user={modalCat} onClose={closeModal} />
        <ModalComponent
        data={catData}
        onClose={closeModal}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        modalTitle="Category Details"
        editableFields={editableFields}
      />
      )}
    </div>
  );
}

export default AddProductCategory;
