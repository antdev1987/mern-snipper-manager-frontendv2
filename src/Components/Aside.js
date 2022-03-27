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
import { FaGem, FaList, FaGithub } from "react-icons/fa";
import { RiArchiveDrawerFill } from "react-icons/ri";
import ProjectForm from "./ProjectForm";
import { useSnippet } from "../context/snippetContext/SnippetProvider";
import { useUser } from "../context/userContext/UserProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Aside() {
  const [isOpen, setIsOpen] = useState(false);
  const { projects, setSnippet } = useSnippet();
  const { user } = useUser();

  const showHideForm = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/snippet/${id}`);
  };

  return (
    <ProSidebar className="">
      <SidebarHeader className="headerStyles">{user.name}</SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem onClick={showHideForm} icon={<FaList />}>
            
            New
          </MenuItem>
          {isOpen && <ProjectForm />}
        </Menu>
        <Menu 
        iconShape="circle"
        
    
        >
          {projects.map((item, i) => (
            <SubMenu
            
              key={item._id}
              onClick={() => handleClick(item._id)}
              suffix={
                <span className="badge text-dark bg-warning">{i + 1}</span>
              }
              title={item.projectName}
              icon={<RiArchiveDrawerFill />}
            >
              <button onClick={() => setSnippet(item._id)}>Add</button>
              <MenuItem> test </MenuItem>

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
  );
}
