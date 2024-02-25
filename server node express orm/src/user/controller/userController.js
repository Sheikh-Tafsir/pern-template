const UserService = require('../service/userService');


    //login
    const login = async (req, res) => {
    //console.log(req.body);
      try {
        const { name, password } = req.body;

        const userService = await UserService.login(name, password);
              
        if(userService.token)res.status(200).json(userService);
        else res.status(401).json(userService);


      } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: error.message });
      }
    };


    //signup
    const signup = async (req, res) => {
      //console.log(req.body);
        try {
          const { name, email, password } = req.body;
    
          const userService = await UserService.signup(name, email, password);
                
          if(userService.token)res.status(201).json(userService);
          else res.status(401).json(userService);
    
    
        } catch (error) {
          console.error("Error during signup:", error.message);
          res.status(500).json({ error: error.message });
        }
      };

      //update
      const updateProfile = async (req, res) => {
        try {
          const id = req.params.id;
          const {
            name,
            email,
            image,
            phoneNo,
            postalCode,
            address,
            addressLongitude,
            addressLatitude,
          } = req.body;

          const userService = await UserService.updateProfile(id, name, email, image, phoneNo, postalCode, address, addressLatitude, addressLongitude);
          
          if(userService.user)res.status(200).json(userService);
          else res.status(404).json(userService);
        
        } catch (error) {
          console.error('Error updating profile:', error.message);
          res.status(500).json({ error: error.message });
        }
      };  


module.exports = {
  login,
  signup,
  updateProfile
};
