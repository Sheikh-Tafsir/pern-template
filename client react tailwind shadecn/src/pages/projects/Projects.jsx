import React, { useState } from 'react';
import './Projects.css'
import { FaFolder, FaFile } from "react-icons/fa";
import NavigationBar from '../landingPage/navbar/NavigationBar';
import Editor from '../editor/Editor';
const Projects = () => {
    const [expandedDirs, setExpandedDirs] = useState([]);
    const directoryData =[
        {
            "name": "project_root",
            "type": "directory",
            "children": [
              {
                "name": "src",
                "type": "directory",
                "children": [
                  {
                    "name": "main",
                    "type": "directory",
                    "children": [
                      {
                        "name": "java",
                        "type": "directory",
                        "children": [
                          {
                            "name": "com",
                            "type": "directory",
                            "children": [
                              {
                                "name": "example",
                                "type": "directory",
                                "children": [
                                  {
                                    "name": "file1.java",
                                    "type": "file"
                                  },
                                  {
                                    "name": "file2.java",
                                    "type": "file"
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "name": "resources",
                "type": "directory",
                "children": [
                  {
                    "name": "config",
                    "type": "directory",
                    "children": [
                      {
                        "name": "config.properties",
                        "type": "file"
                      }
                    ]
                  }
                ]
              }
            ]
          }
    ]
    const handleDirectoryClick = (dirName) => {
      if (expandedDirs.includes(dirName)) {
        setExpandedDirs(expandedDirs.filter((item) => item !== dirName));
      } else {
        setExpandedDirs([...expandedDirs, dirName]);
      }
    };

    const handleOpenFile = (directory) => {

    }
  
    const renderDirectory = (directory) => (
      <div key={directory.name} className='projects_directory'>
        <div onClick={() => handleDirectoryClick(directory.name)} className='projects_subDirectory'>
          <FaFolder className='my-auto'/><p className='projects_folderName'>{directory.name}</p>
        </div>
        {expandedDirs.includes(directory.name) && directory.children && (
          <div style={{ marginLeft: '20px' }} className=''>
            {directory.children.map((child) =>
              child.type === 'directory' ? renderDirectory(child) : 
                <div onClick={() => handleOpenFile(directory)} className='projects_subDirectory'>
                    <FaFile className='my-auto'/><p className='projects_folderName'>{directory.name}</p>
                </div>
            )}
          </div>
        )}
      </div>
    );
  
    return (
    <>      
        <div className='projects'>
            <div className='projects_mainBox'>
                <h2 className='projects_headerName'>File</h2>
                {directoryData.map((directory) =>
                    directory.type === 'directory' ? renderDirectory(directory) : 
                        <div onClick={() => handleOpenFile(directory)} className='projects_subDirectory'>
                            <FaFile className='my-auto'/><p className='projects_folderName'>{directory.name}</p>
                        </div>
                )}
            </div>
            <Editor/>
        </div>
      </>
    );
}

export default Projects