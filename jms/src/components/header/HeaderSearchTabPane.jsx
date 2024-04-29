import React from "react";

function HeaderSearchTabPane({ firstData, secondData, search }) {
  return (
    <div>
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="d-md-flex justify-content-between mb-2">
                <ul className="nav nav-tabs b-none">
                  <li className="nav-item">
                  <a className="nav-link active" data-toggle="tab" href="#addnew">
                    <i className="fa fa-plus"></i>&nbsp;{firstData}
                  </a>
                  </li>
                  &nbsp;&nbsp;&nbsp;
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#list">
                      <i className="fa fa-list-ul"></i>&nbsp;{secondData}
                    </a>
                  </li>
                </ul>
              </div>
              {search ? (
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-sm-6">
                    {search.map((item, index) => (
                      <div key={index} className="input-group mb-1">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={item.name}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-primary btn-block mb-1"
                      title=""
                    >
                      Search
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSearchTabPane;
