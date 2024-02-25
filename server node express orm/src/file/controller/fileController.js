const FileService = require('../service/fileService');

    //view
    const viewFile = async (req, res) => {
        try {
        const { name, userName } = req.body;
        const projectService = await ProjectService.viewProject(name, userName);
            
        if(projectService.project)res.status(200).json(projectService);
        else res.status(404).json(projectService);


        } catch (error) {
            console.error("Error during project creation:", error.message);
            res.status(500).json({ error: error.message });
        }
    };

    //create
    const createFile = async (req, res) => {
      try {
        const { name, userName } = req.body;
        const projectService = await ProjectService.createProject(name, userName);
            
        if(projectService.project)res.status(201).json(projectService);
        else res.status(401).json(projectService);


      } catch (error) {
        console.error("Error during project creation:", error.message);
        res.status(500).json({ error: error.message });
      }
    };

    //update
    const updateFile = async (req, res) => {
        try {
          const { name, userName, folderStructure } = req.body;
          const projectService = await ProjectService.updateProject(name, userName, folderStructure);
              
          if(projectService.project)res.status(201).json(projectService);
          else res.status(401).json(projectService);
  
  
        } catch (error) {
          console.error("Error during project creation:", error.message);
          res.status(500).json({ error: error.message });
        }
    };

    const deleteFile = async (req, res) => {
        try {
          const { name, userName } = req.body;
          const projectService = await ProjectService.updateProject(name, userName);
              
          //if(projectService.project)
          res.status(201).json(projectService);
          //else res.status(401).json(projectService);
  
        } catch (error) {
          console.error("Error during project creation:", error.message);
          res.status(500).json({ error: error.message });
        }
      };

module.exports = {
    viewFile,
    createFile,
    updateFile,
    deleteFile,
};
      