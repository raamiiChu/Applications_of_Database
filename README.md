# Guide
- 如果只想單純匯入資料庫，遵照 **Import backup.sql** 的步驟  
- 如果想批量生成新的資料，遵照 **Run Code** 的步驟  

# Import `backup.sql`
1. 下載 `backup.sql`
 
2. 在自己的 MySQL 建立新的資料庫  
    `CREATE DATABASE <database_name>;`
   
3. 開啟終端機，切換路徑到 `backup.sql` 所在路徑
 
4. 在終端機輸入以下指令  
    `mysql -u <user_name> -p <database_name> < backup.sql`
   - username: 默認是 root 或 admin  
   - database_name: 你剛剛建立的資料庫名稱

5. 輸入密碼後，資料庫即建立成功

   ![image](https://github.com/raamiiChu/Applications_of_Database/assets/87169493/3e3fcc0a-a55f-4c29-a8f3-06380b341e50)

6. 開始使用資料庫
   
   ![image](https://github.com/raamiiChu/Applications_of_Database/assets/87169493/f6d9949e-00d0-4ce2-8d21-bd6d200111f1)


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

5. Start the code in the terminal: ```nodemon app.js```

6. Install **Thunder Client** in VS Code  
    p.s. You can use **Postman** if you want.

    ![image](https://github.com/raamiiChu/Applications_of_Database/assets/87169493/6a146d30-f63a-4fe6-8eb3-bb5dc3aa704f)


8. Settings in **Thunder Client**

    ![image](https://github.com/raamiiChu/Applications_of_Database/assets/87169493/fa889d66-1504-42ca-a62a-b990672f0dd7)

    1. set HTTP request as **POST**
    2. set URL as `localhost:3000/generate/users`, then click **Send** button
    3. wait until the terminal stops scrolling
    4. set URL as `localhost:3000/generate/products`, `localhost:3000/generate/orders` respectively, then follow step 2 ~ 3

9. Stop the code in the terminal: ```ctrl + c```

10. Start exploring your database on MySQL server

    ![image](https://github.com/raamiiChu/Applications_of_Database/assets/87169493/f6d9949e-00d0-4ce2-8d21-bd6d200111f1)
