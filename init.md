```zsh
  yarn add express
  yarn init -y
  yarn add @types/express -D

  // pois o node não interpreta o ts sozinho 
  yarn add typescript -D
  
  // inicializa o arquivo de configuração do typescript
  yarn tsc --init

  // converte o ts em js
  yarn ts-node-dev -D

  // TYPEORM
  yarn add typeorm reflect-metadata

  yarn add sqlite3

  yarn add pg

  // email
  yarn add nodemailer
  yarn add @types/nodemailer -D
  yarn add handlebars

  //validation
  yarn add yup
  yarn add express-async-errors
```

// setting orm cli  
```json
 "scripts": {
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
    "orm": "ts-node-dev node_modules/typeorm/cli.js"
  },
```

```zsh
  // create
  yarn orm migration:create -n CreateUsers
  yarn orm migration:create -n CreateSurveys
  yarn orm migration:create -n CreateSurveysUsers

  // running
  yarn orm migration:run

  // rollback
  yarn orm migration:revert
```

// enable decorators typeorm in tsconfig.json:
```ts
  (...)
  "strictPropertyInitialization": false,
  (...)
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true, 
  (...)
```

// uuid gerencia os ids da aplicação:
```zsh
  yarn add uuid
  yarn add @types/uuid -D
```

```text
  Testes Automatizados
  1 - Testes unitários
  2 - Testes de integração

  yarn add jest @types/jest -D
  yarn jest --init
  yarn add ts-jest -D
  yarn add supertest @types/supertest -D

    ✔ Would you like to use Jest when running "test" script in "package.json"? … yes
    ✔ Would you like to use Typescript for the configuration file? … yes
    ✔ Choose the test environment that will be used for testing › node
    ✔ Do you want Jest to add coverage reports? … no
    ✔ Which provider should be used to instrument code for coverage? › v8
    ✔ Automatically clear mock calls and instances between every test? … yes

```

// jest.config.ts:
```ts
  (...)
  bail: true,
  preset: "ts-jest",
  testMatch: [
    "**/__tests__/*.test.ts"
  ],
  (...)
```

// package.json:
```json
  (...)
  "scripts": {
    "test": "NODE_ENV=test jest"
  },
  (...)
```

// kill them all
```zsh
kill -9 $(lsof -t -i:3333)
```





