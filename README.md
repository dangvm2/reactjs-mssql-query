# reactjs-mssql-query
Query to MSSQL by Web UI

# Setup Server Side
1. Create store procedure with Statement: 
      ```sh
      CREATE PROCEDURE sp_Run     
        @query NVARCHAR(MAX) =''
      AS
      BEGIN
      SET NOCOUNT ON;

       EXECUTE(@query)  
      END
      ```

2. Config DB information in: `server/server.js`
      ```sh
      var config = {
          user: '',
          password: '',
          server: '',
          database: ''
      };
      ```
      
# Setup Client Side
1. Config your api domain (if you use other Server Side or other Server Port) in: `client/src/redux/constants.js`
  ```sh
  default: export const url = process.env.NODE_ENV === 'production' ? "/api/" : "http://localhost:5000/api/"
  ```
  
Finally start Server and Client by "npm start" for both.






**Enjoy!!!**
