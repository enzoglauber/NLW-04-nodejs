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

// uuid gerencia os ids da applicação:
```zsh
  yarn add uuid
  yarn add @types/uuid -D
```



