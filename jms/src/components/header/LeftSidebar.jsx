import React from "react";
import { Link } from "react-router-dom";


const LeftSidebar = ({ srtIcon, head, sideItem }) => {
  return (
    <div>
      <div id="header_top" className="header_top">
        <div className="container">
          <div className="hleft">
            <a className="header-brand" href={undefined}>
              <i className="fa fa-soccer-ball-o brand-logo"></i>
            </a>
            <div className="dropdown">
              <a href={undefined} className="nav-link user_btn">
                <img
                  className="avatar"
                  src="assets/images/user.png"
                  alt=""
                  data-toggle="tooltip"
                  data-placement="right"
                  title="User Menu"
                />
              </a>
              {srtIcon.map((icon, index) => (
                <Link
                  key={index}
                  to={icon.path}
                  className="nav-link icon theme_btn xs-hide"
                >
                  <i
                    className={icon.icon}
                    data-toggle="tooltip"
                    data-placement="right"
                    title={icon.text}
                  ></i>
                </Link>
              ))}
            </div>
          </div>
          <div className="hright">
            <div className="dropdown">
              <a href={undefined} className="nav-link icon settingbar">
                <i
                  className="fa fa-gear fa-spin"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Settings"
                ></i>
              </a>
              <a href={undefined} className="nav-link icon menu_toggle">
                <i className="fa fa-align-left"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="left-sidebar" className={`sidebar`}>
        <h5 className="brand-name">
          {head}
          <a href={undefined} className="menu_option float-right">
            <i
              className="icon-grid font-16 fa fa-th-list"
              data-toggle="tooltip"
              data-placement="left"
              title="Grid & List Toggle"
            ></i>
          </a>
        </h5>
        <nav id="left-sidebar-nav" className="sidebar-nav">
          <ul className="metismenu">
            {sideItem.map((item, index) => (
              <li key={index}>
                {item.category && (
                  <ul>
                    <li className="g_heading">{item.category}</li>
                  </ul>
                )}
                {item.subItems ? (
                  <>
                    <a href={undefined} className="has-arrow arrow-c">
                      <i className={item.icon}></i>
                      <span>{item.title}</span>
                    </a>
                    <ul>
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subItem.path}>{subItem.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={item.path}>
                    <i className={item.icon}></i>
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
            <li className="g_heading">Support</li>
            <li>
              <a href={undefined}>
                <i className="fa fa-support"></i>
                <span>Need Help?</span>
              </a>
            </li>
            <li>
              <a href={undefined}>
                <i className="fa fa-tag"></i>
                <span>Contact Us</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LeftSidebar;
