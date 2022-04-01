import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import { FaGithub } from "react-icons/fa";
import { RiArchiveDrawerFill, RiFolderAddFill } from "react-icons/ri";
import ProjectForm from "./ProjectForm";
import { useSnippet } from "../context/snippetContext/SnippetProvider";
import { useUser } from "../context/userContext/UserProvider";
import { useNavigate } from "react-router-dom";

export default function Aside() {
  const { projects } = useSnippet();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const showHideForm = () => {
    setIsOpen(!isOpen);
  };


  const handleClick = (id) => {
    navigate(`/snippet/${id}`);
  };

  // heres goes the jsx code
  return (
    <div>

    <ProSidebar 
    breakPoint="md"
    className="pro-side ">
      <SidebarHeader className="headerStyles">{user.name}</SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            onClick={showHideForm}
            icon={<RiFolderAddFill className="fs-4" />}
          >
            Create Directory
          </MenuItem>
          {isOpen && <ProjectForm />}
        </Menu>

        <Menu iconShape="circle">
          <label className="d-block text-center text-white">Directories</label>
          {projects.map((item, i) => (
            <SubMenu
              key={item._id}
              onClick={() => handleClick(item._id)}
              suffix={
                <span className="badge text-dark bg-warning">
                  {item.snippetsId.length}
                </span>
              }
              title={item.projectName}
              icon={<RiArchiveDrawerFill className="fs-6" />}
            >
              <div className="d-flex justify-content-between ">
                <button className="btn w-100 me-3 btn-primary"> Back </button>
              </div>

              {item.snippets?.map((item, i) => {
                return <MenuItem> {item.name} </MenuItem>;
              })}
            </SubMenu>
          ))}
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper">
          <a
            href="https://www.github.com"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
            >
            <FaGithub />
            <span>Github</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
            </div>
  );
}
