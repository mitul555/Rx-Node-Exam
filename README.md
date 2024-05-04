Step
- npm init -y
- npm install express // freamwork node
- npm install hbs // template engline like twig
- npm install path // for get all path
- npm install body-parser // for get form data
- npm install joo // for validation
- npm install sequelize mysql2 //for database connection

Dir Strcture
Project 
    - config
        - config.js //database connection
    - models // main model for data file
        - product.js // product related field defiend
        - user.js // user related field defiend
    - public
        -images // all the upload images store here
    - node_modules //all default node module
    - app.js // this is heart file of this product