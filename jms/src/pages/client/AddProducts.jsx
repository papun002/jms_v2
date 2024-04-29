import React, { useEffect, useState } from "react";
import { usePageTitle } from "../../components/functionalities/PageTitleProvider";
import HeaderSearchTabPane from "../../components/header/HeaderSearchTabPane";
import ProductDataTable from "../../components/dataTable/ProductDataTable";
import axios from "axios";
import Toast from "../../components/alert/Toast";

function AddProducts() {
  const { handlePageTitleChange } = usePageTitle();
  const [category, setCategory] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showFloatingNotification, setShowFloatingNotification] =
    useState(false);
  const token = localStorage.getItem("token");

  //floating notification
  useEffect(() => {
    setShowFloatingNotification(!isFormValid); // Show floating notification when form is not valid
  }, [isFormValid]);

  //floating notification end

  //   dynamic TextField
  const [inputRows, setInputRows] = useState([
    { id: 1, values: ["", "", "", "", ""] },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: inputRows.length + 1,
      values: ["", "", "", "", ""],
    };
    setInputRows([...inputRows, newRow]);
  };

  const handleRemoveRow = (id) => {
    const updatedRows = inputRows.filter((row) => row.id !== id);
    setInputRows(updatedRows);
  };

  const handleInputChange = (id, index, value) => {
    const updatedRows = inputRows.map((row) =>
      row.id === id
        ? {
            ...row,
            values: [
              ...row.values.slice(0, index),
              value,
              ...row.values.slice(index + 1),
            ],
          }
        : row
    );
    setInputRows(updatedRows);
  };
  //end of dynamic

  //page title start
  useEffect(() => {
    handlePageTitleChange("Stocks Section");
    return () => {
      handlePageTitleChange("Empty");
    };
  }, [handlePageTitleChange]);
  //page title end

  // feting category data from server
  const fetchingCategory = async () => {
    await axios
      .get("http://localhost:4000/client/cat/getcategory",{
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchingCategory();
  }, []);
  //end of fetching category data from server

  //Inserting data to the Server | Database
  const InsertProduct = async (e) => {
    e.preventDefault();
    // console.log("Input data:", typeof(inputRows));
    try {
      const dataToProduct = inputRows.map((row) => ({
        barcode: row.values[0],
        name: row.values[1],
        huid: row.values[2],
        weight: row.values[3],
        description: row.values[4],
        cname: e.target.cat.value,
        ptype: e.target.ptype.value,
      }));
      // console.log(typeof dataToProduct);
      // console.log("Data to product:", dataToProduct);

      const res = await axios.post(
        "http://localhost:4000/client/pdt/addproduct",
        dataToProduct,{
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      // console.log(res.data);
      if (res.data.status === "201") {
        setToastVisible(true);
        setResponse({
          message: res.data.data,
          type: "success",
        });
        fetchProduct();
      }else{
        setToastVisible(true);
        setResponse({
          message: res.data.data,
          type: "error",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // toastVisible
  const handleCloseToast = () => {
    setToastVisible(false);
  };
  // toastVisible end

  //form validation
  useEffect(() => {
    const isFormValid = inputRows.every((row) =>
      row.values.every((value) => value.trim().length > 0)
    );
    setIsFormValid(isFormValid);
  }, [inputRows]);
  //end of form validation

  //fetching Products from the server
  const [products, setProducts] = useState([]);
  const header = [
    "Barcode",
    "Name",
    "Category",
    "HUID",
    "Weight(gm)",
    "Desc",
    "Status",
  ];
  const tableName = "Product Details";
  const fetchProduct = async () => {
    axios
      .get("http://localhost:4000/client/pdt/getAllProducts",{
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => console.error("Fetching Error", err));
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  //end of fetching products from the server
  return (
    <div>
      <HeaderSearchTabPane
        firstData={"Add Product Details"}
        secondData={"View Product Details"}
      />
      {toastVisible && (
        <Toast
          message={response.message}
          type={response.type}
          duration={1000}
          onClose={handleCloseToast}
        />
      )}
      <div className="tab-content">
        <div className="tab-pane fade show active" id="addnew" role="tabpanel">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Add Product</h3>
                  <div className="card-options">
                    {showFloatingNotification && (
                      <div className="notify text-red">
                        <i className="fa fa-exclamation-triangle"></i>{" "}
                        <small className="">Please Fillup all Fields</small>
                      </div>
                    )}
                    <button
                      type="button"
                      className="btn btn-link card-options-collapse"
                      data-toggle="card-collapse"
                    >
                      <i className="fa fa-chevron-up"></i>
                    </button>
                  </div>
                </div>
                <form
                  onSubmit={InsertProduct}
                  className={`${!isFormValid ? " disabled-form" : ""}`}
                >
                  <div className="card-body">
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div
                          className={`form-group${
                            !isFormValid ? " disabled-form" : ""
                          }`}
                        >
                          <label htmlFor="">Select Category</label>
                          <select className="form-control" name="cat" id="">
                            {category && category.length > 0 ? (
                              <>
                                <option value="">Select Category</option>
                                {category.map((cat) => (
                                  <option key={cat._id} value={cat.cat_name}>
                                    {cat.cat_name}
                                  </option>
                                ))}
                              </>
                            ) : (
                              <option value="" disabled>
                                No categories found
                              </option>
                            )}
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="">Product Type</label>
                          <select className="form-control" name="ptype" id="">
                            <option value="gold">Gold</option>
                            <option value="silver">Silver</option>
                            <option value="diamond">Diamond</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 col-lg-12">
                        <div className="form-group">
                          <div className="table-responsive">
                            <table className="table" id="addProduct">
                              <thead>
                                <tr>
                                  <th>Barcode</th>
                                  <th>Name</th>
                                  <th>HUID No.</th>
                                  <th>Weight</th>
                                  <th>Description</th>
                                  <th>
                                    <button
                                      type="button"
                                      className="btn btn-success btn-sm btnAddRow"
                                      onClick={handleAddRow}
                                    >
                                      <i className="fa fa-plus"></i>
                                    </button>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {inputRows.map((row, rowIndex) => (
                                  <tr key={rowIndex}>
                                    {row.values.map((value, index) => (
                                      <td key={index}>
                                        <input
                                          type="text"
                                          className={`form-control `}
                                          value={value}
                                          onChange={(e) =>
                                            handleInputChange(
                                              row.id,
                                              index,
                                              e.target.value
                                            )
                                          }
                                        />
                                      </td>
                                    ))}
                                    <td>
                                      <button
                                        type="button"
                                        className="btn tag-success btn-sm"
                                        onClick={() => handleRemoveRow(row.id)}
                                      >
                                        <i className="fa fa-minus"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="btn btn-red mt-2 w-100"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="list" role="tabpanel">
          {loading ? (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "60vh" }}
            >
              <div className="loader"></div>
            </div>
          ) : (
            <div className="col-12">
              <div className="row">
                <ProductDataTable
                  users={products}
                  header={header}
                  tableName={tableName}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProducts;
