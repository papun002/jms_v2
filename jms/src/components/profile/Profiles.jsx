import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import { useLocation } from "react-router-dom";

function Profiles() {
    const [editable, setEditable] = useState(false);
    const [staffInfo, setStaffInfo] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const { handlePageTitleChange } = usePageTitle();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    //console.log("sid", id);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/client/staffs/staffprofile/${id}`,{
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            }
          );
          const data = response.data.data;
          setLoading(false);
          setStaffInfo(data);
          setFormData({ ...data });
        } catch (error) {
          console.error("Error in Fetching Staffs:", error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      handlePageTitleChange("Staffs Profile");
      return () => {
        handlePageTitleChange("Empty");
      };
    }, [handlePageTitleChange]);
  
    // Update data
    const handleUpdate = () => {
      axios
        .put(`/client/staffs/updatestaff/${formData._id}`, formData)
        .then((response) => {
          if (response.status === 200) {
            setEditable(false);
            // Update originalData if needed
            setOriginalData(formData);
          } else {
            console.error("Error updating staff data");
          }
        })
        .catch((error) => {
          console.error("Error updating staff data:", error);
        });
    };
    // Toggle edit mode
    const handleEditToggle = () => {
        if (!editable) {
          // Reset formData to current values from staffInfo when entering edit mode
          setFormData({ ...staffInfo });
        }
        setEditable(!editable);
    };
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
  
    // Delete data
    const handleDelete = () => {
        // Logic to handle deleting the staff info
      };
  return (
    <>
      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="loader"></div>
        </div>
      ) : (
        <div className="row clearfix">
          {staffInfo.map((staff, index) => (
            <div className="col-lg-12 col-md-12" key={index}>
              <div className="card">
                <div className="card-header">
                  <div className="card-options">
                    <div className="item-action dropdown ml-2">
                      <a href={undefined} data-toggle="dropdown">
                        <i className="fa fa-info-circle"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right">
                        {editable ? (
                          <>
                            <a
                              href={undefined}
                              className="dropdown-item"
                              onClick={handleUpdate}
                            >
                              <i className="dropdown-icon fa fa-edit"></i> Save
                            </a>
                            <a
                              href={undefined}
                              className="dropdown-item"
                              onClick={handleEditToggle}
                            >
                              <i className="dropdown-icon fa fa-times"></i>{" "}
                              Cancel
                            </a>
                          </>
                        ) : (
                          <>
                            <a
                              href={undefined}
                              className="dropdown-item"
                              onClick={handleEditToggle}
                            >
                              <i className="dropdown-icon fa fa-edit"></i>{" "}
                              Update
                            </a>
                            <a
                              href={undefined}
                              className="dropdown-item"
                              onClick={handleDelete}
                            >
                              <i className="dropdown-icon fa fa-trash"></i>{" "}
                              Delete
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-3 col-md-12 text-center">
                      <div className="square">
                        <img
                          className="rounded-square"
                          src={staff.staffimg}
                          alt=""
                        />
                      </div>
                      <div className="sts dflex">
                        {staff.sts === "active" ? (
                          <span className="">
                            Status:{" "}
                            <i
                              className="fa fa-circle"
                              style={{ color: "#008000" }}
                            ></i>
                          </span>
                        ) : (
                          <span className="d">
                            Status :{" "}
                            <i
                              className="fa fa-circle"
                              style={{ color: "#FF0000" }}
                            ></i>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <small className="text-muted">Name: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              className="form-control"
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0 text-capitalize">{staff.name}</p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Contact: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="contact"
                              className="form-control"
                              value={formData.contact}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0">{staff.contact}</p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Email: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="email"
                              className="form-control"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0">{staff.email}</p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Gender: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="gender"
                              className="form-control"
                              value={formData.gender}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0 text-capitalize">
                              {staff.gender}
                            </p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Date of Joining</small>
                          {editable ? (
                            <input
                              type="text"
                              name="doj"
                              className="form-control"
                              value={formData.doj}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0">{staff.doj}</p>
                          )}
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <ul className="list-group">
                        <li className="list-group-item">
                          <small className="text-muted">Address: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="address"
                              className="form-control"
                              value={formData.address}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0 text-capitalize">
                              {staff.address}
                            </p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">
                            Government Proof:{" "}
                          </small>
                          {editable ? (
                            <input
                              type="text"
                              name="govtproof"
                              className="form-control"
                              value={formData.govtproof}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0">{staff.govtproof}</p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Staff Id: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="staffid"
                              className="form-control"
                              value={formData.staffid}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0">{staff.staffid}</p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Staff Password: </small>
                          {editable ? (
                            <input
                              type="text"
                              name="staffpwd"
                              className="form-control"
                              value={editable ? formData[0].staffpwd : ''}
                              onChange={handleChange}
                            />
                          ) : (
                            <p className="mb-0">{staff.staffpwd}</p>
                          )}
                        </li>
                        <li className="list-group-item">
                          <small className="text-muted">Staff Image</small>
                          {editable ? (
                            <input
                              type="file"
                              name="staffimg"
                              className="form-control"
                              onChange={handleChange}
                            />
                          ) : null}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Profiles;
