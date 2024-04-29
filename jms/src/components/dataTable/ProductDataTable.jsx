import React, { useState, useEffect } from "react";
import ModalComponent from "../modal/ModalComponent";
// import Pagination from "react-bootstrap/Pagination";

function ProductDataTable({ users, header, tableName }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term

  const indexOfLastItem = currentPage * entriesPerPage;
  const indexOfFirstItem = indexOfLastItem - entriesPerPage;

  // Filter users based on the search term
  const filteredUsers = users.filter((user) => {
    const values = Object.values(user);
    for (let value of values) {
      if (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });

  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  // console.log("Current users:", currentItems);

  const totalItems = filteredUsers.length;
  const pageNumbers = Math.ceil(totalItems / entriesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEntriesPerPageChange = (e) => {
    const newEntriesPerPage = parseInt(e.target.value, 10);
    // console.log("New entries per page:", newEntriesPerPage);
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    window.$("#staticBackdrop").modal("show");
  };

  const closeModal = () => {
    setSelectedUser(null);
    window.$("#staticBackdrop").modal("hide");
  };

  //search Logic
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when the search term changes
  };
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{tableName}</h3>
        <div className="card-options ">
          <button
            type="button"
            className="btn btn-link card-options-collapse"
            data-toggle="card-collapse"
          >
            <i className="fa fa-chevron-up"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="showEntity  ">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="row">
              <div className="col-sm-12 col-lg-4 col-md-4">
                <div className="search d-flex">
                  <span>Show</span>
                  <select
                    className="form-control ml-2 mr-2 w-50"
                    onChange={handleEntriesPerPageChange}
                    value={entriesPerPage}
                    style={{ position: "relative", bottom: "10px" }}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span>entries</span>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 col-md-4 mb-3 text-center">
                <div className="input-btn mb-2">
                  <button className="btn btn-red btn-lg mr-1">
                    <i className="fa fa-copy"></i>
                  </button>
                  <button className="btn btn-red btn-lg mr-1">
                    <i className="fa fa-print"></i>
                  </button>
                  <button className="btn btn-red btn-lg mr-1">
                    <i className="fa fa-file-excel-o"></i>
                  </button>
                  <button className="btn btn-red btn-lg mr-1">
                    <i className="fa fa-file-pdf-o"></i>
                  </button>
                </div>
              </div>
              <div className="col-sm-12 col-lg-4 col-md-4">
                <div className="input-search">
                  <input
                    className="form-control float-right mb-2"
                    placeholder="Barcode to Search..."
                    type="search"
                    style={{ position: "relative" }}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="table-responsive">
            <table className="table table-striped v_center" id="table-2">
              <thead>
                <tr>
                  <th className="text-center">
                    <div className="custom-checkbox custom-control">
                      <input
                        type="checkbox"
                        data-checkboxes="mygroup"
                        data-checkbox-role="dad"
                        className="custom-control-input"
                        id="checkbox-all"
                      />
                      <label
                        htmlFor="checkbox-all"
                        className="custom-control-label"
                      >
                        &nbsp;
                      </label>
                    </div>
                  </th>
                  {header.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems ? (
                  currentItems.map((i, index) => {
                    return (
                      <tr key={index} className="text-capitalize">
                        <td>
                          <div className="custom-checkbox custom-control">
                            <input
                              type="checkbox"
                              data-checkboxes="mygroup"
                              className="custom-control-input"
                              id="checkbox-1"
                            />
                            <label
                              htmlFor="checkbox-1"
                              className="custom-control-label"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </td>
                        <td>{i.pbarcode}</td>
                        <td>{i.pname}</td>
                        <td>{i.cname}</td>
                        <td>{i.phuid}</td>
                        <td>{i.pweight}</td>
                        <td>{i.pdescription}</td>
                        <td>
                          <div className="badge badge-success">{i.sts}</div>
                        </td>
                        <td>
                          <span>
                            <button
                              data-toggle="modal"
                              data-target="#staticBackdrop"
                              onClick={() => openModal(i)}
                              className="btn btn-secondary"
                            >
                              Detail
                            </button>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <td colSpan={9}>
                    <h3 className="text-center card-title">
                      No Data found in this Table..
                    </h3>
                  </td>
                )}
              </tbody>
            </table>

            {/* Pagination */}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <span>
            Showing &nbsp;{indexOfFirstItem + 1} to {indexOfLastItem} of{" "}
            {totalItems}
          </span>
          <nav aria-label="...">
            <ul className="pagination">
              <li
                className={`page-item${currentPage === 1 ? " disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => paginate(currentPage - 1)}
                  tabIndex="-1"
                >
                  Previous
                </a>
              </li>
              {Array.from({ length: Math.min(3, pageNumbers) }).map(
                (_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = currentPage === pageNumber;

                  return (
                    <li
                      key={index}
                      className={`page-item${isCurrentPage ? " active" : ""}`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </a>
                    </li>
                  );
                }
              )}
              {currentPage > 3 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              {currentPage > 3 && (
                <li className="page-item active">
                  <a
                    className="page-link "
                    href="#"
                    onClick={() => paginate(currentPage)}
                  >
                    {currentPage}
                  </a>
                </li>
              )}
              <li
                className={`page-item${
                  currentPage === pageNumbers ? " disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {selectedUser && (
        <ModalComponent user={selectedUser} onClose={closeModal} />
      )}
    </div>
  );
}

export default ProductDataTable;
