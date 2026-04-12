# Cheat Sheet - most important commands

## Database

How can I have a look into the database? I would like to browse the database to get a visual impression of the current status.
Since MySQL is exposed on localhost:3306, you can connect with any database GUI. A few options installable via scoop:
pwsh

Connect with:

• Host: 127.0.0.1
• Port: 3306
• User: root
• Password: groot
• Database: webdevhqcom_dev

Alternatively, you can browse it directly from the command line without installing anything:

- `docker compose exec mysql mysql -uroot -pgroot webdevhqcom_dev`
