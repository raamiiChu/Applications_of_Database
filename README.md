# Import `backup.sql`
    `mysql -u <user_name> -p <database_name> < backup.sql`

# Run Code

1. Install packages: ```npm install```

2. Start MySQL server  

3. Create database:  
    ```CREATE DATABASE `DCT_Applications_of_Database`;```

4. Create config: ```.env``` (You can copy the schema from template: ```.env-template```)

    - `DB_DATABASE`: the database name you just created
    - `DB_USERNAME`: **root** or **admin** in default
    - `DB_PASSWORD`: your password for MySQL server
    - `DB_HOST`: **localhost** in default
    - `DB_PORT`: **3306** in default 

5. Start the code in terminal: ```nodemon app.js```

6. Install **Thunder Client** in VS Code  
    p.s. You can use **Postman** if you want.

    ![image](https://github.com/raamiiChu/Applications_of_Database/assets/87169493/6a146d30-f63a-4fe6-8eb3-bb5dc3aa704f)


8. Settings in **Thunder Client**

    ![image](https://github.com/raamiiChu/Applications_of_Database/assets/87169493/fa889d66-1504-42ca-a62a-b990672f0dd7)

    1. set HTTP request as **POST**
    2. set URL as `localhost:3000/generate/users`, then click **Send** button
    3. wait until the terminal stops scrolling
    4. set URL as `localhost:3000/generate/products`, `localhost:3000/generate/orders` respectively, then follow step 2 ~ 3

9. Stop the code in terminal: ```ctrl + c```

10. Start exploring your database in MySQL server

    ![image](https://github.com/raamiiChu/Applications_of_Database/assets/87169493/f6d9949e-00d0-4ce2-8d21-bd6d200111f1)
