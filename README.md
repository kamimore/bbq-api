# bbq-bd-api

# Author :
Pulkit chadha.

# Local Setup:

git clone https://github.com/rohit-mindrops/bbq-bd-api.git

cd bbq-bd-api

yarn

To start the server in development mode, run the below command

yarn run dev

# Directory Structure 

# 1. application [Directory]
 
It has all the layers of the application Controller , Services and Views. Controllers and Services resides in controller-service-layer and it was automatically binded to routes at the time of application boot.
 
#Views decides the response type depending upon content-type of request.
 
# 2. configurations [Directory]
  
 Insides configurations deirectory resides following files
  
  a. ApplicationMessages - A file that will contain all kind of message error and success. Change at one place and reflect at every place.
  
  b. BootStrap - A file contains all the functions that should run at the boot time.
  
  c. Conf - A file that contains constant of application like port, email configurations , roles etc
  
  d. DependencyInclude - File contains all the dependecies used in the project
  
  e. router - File which decides for which url , which controller and which acction will be called.
  
# 3. middlewares [Directory]
  
  Directory which will contain all the custom middleware used in the project.
  
# 4. utilities [Directory]
  Contains all the utility functions like mail sending , aws upload etc.

 
 
