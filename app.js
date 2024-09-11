const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const swaggerUi = require('swagger-ui-express');
const swaggerSetup = require('./docs/swagger');


// Middleware para monitorar o endpoint e o tempo da requisição
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`Endpoint: ${req.method} ${req.originalUrl} | Tempo de execução: ${duration}ms`);
    });
    next();
});

// REQUIRE ROTAS
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const imageRoutes = require('./routes/imageRoutes');
app.use(express.json());

// SWAGGER
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

// USO DAS ROTAS
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/images', imageRoutes);

// INICIAR SERVIDOR
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`O servidor está em execução em http://localhost:${PORT}`);
});

