
## TO START DEVELOPING

### Command to generate model & migration
```bash
npx sequelize-cli model:generate --name users --attributes
name:string,email:string,password:string --underscored --force
```

### Command to start server
```bash
npm run dev
```

### Database Commands
```bash
npm run db:migrate # migrates all tables
npm run db:seed # Seeds tables with dummy data
npm run db:create # Creates database
npm run db:clear # Deletes database and recreates it
npm run db:clean # Resets database with migrations and seeds
```