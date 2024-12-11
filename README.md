## Project setup

```
npm install
```

### Run the Vite development server locally

```
npm run dev
```

Launches the development server in local mode, binding to `localhost`. This configuration ensures that the server is only accessible from the local machine for development purposes.

### Run the Vite development server on the local network.

```
npm run ndev
```

Launches the development server with network visibility by binding to `0.0.0.0`. This allows the server to be accessed not only from the local machine but also from other devices on the same network, facilitating cross-device testing and collaboration.

**Security Consideration:** When exposing the development server to the local network, be cautious of potential security risks. Ensure that your firewall settings are appropriately configured and that sensitive information is protected while the server is accessible.

### Compiles and minifies for production

```
npm run build
```

## API Integration

The API token is included in my submission e-mail. You simply have to add it to the env file/s by replacing "hidden-from-public". They key is `VITE_PROJECT_TOKEN`.
