# ROADMAP.md

> **Current Phase**: Not started
> **Milestone**: v1.0

## Must-Haves (from SPEC)
- [ ] La aplicación permite realizar CRUD completo de un postulante.
- [ ] Las carpetas en `/storage/postulantes/` se generan y renombran dinámicamente según el Apellido, Nombre y DNI del postulante.
- [ ] El Dashboard carga correctamente con los gráficos solicitados (por provincia, aprobación, título y puesto).
- [ ] Los usuarios pueden ingresar al sistema y el flujo es restringido acorde a su rol asignado (`admin`, `jefe de rrhh`, `staff`).
- [ ] El sistema se inicializa con los datos base de carga requeridos (Puestos, Títulos y Portales: Pandape, Linkedin, ManPower, Referenciado).
- [ ] Se disponen de usuarios por defecto (admin, jefe de rrhh, y staff) con contraseñas simples cargadas de inicio para realizar pruebas.
- [ ] Los filtros de búsqueda de la pantalla principal permiten combinar atributos (provincia, puesto, título, etc.) y muestran los resultados adecuadamente.
- [ ] La aplicación puede levantarse a través de `docker-compose up` e interactuar con la Base de datos sin requerir configuraciones manuales complejas del lado del usuario.

## Phases

### Phase 1: Foundation y Arquitectura Backend
**Status**: ✅ Complete
**Objective**: Establecer la estructura base del backend (Node.js/Express) utilizando arquitectura limpia, configurar Docker (`docker-compose.yml` para los ambientes solicitados) y definir el esquema inicial de Base de Datos para Usuarios, Roles, Puestos, Títulos y Portales utilizando el Patrón Repository.
**Requirements**: REQ-07, REQ-08, REQ-10, REQ-11

### Phase 2: Seguridad, RBAC y Endpoints de Soporte
**Status**: ✅ Complete
**Objective**: Implementar encriptación bcrypt, autenticación JWT, roles de usuario, y el crud/endpoints básicos (`admin`, `jefe de rrhh`, `staff`) y crear los *seeder* necesarios.
**Requirements**: REQ-05, REQ-09, REQ-11

### Phase 3: Gestión de Postulantes (Backend & Sistema de Archivos)
**Status**: ✅ Complete
**Objective**: Crear la API RESTful completa de Postulantes, incluyendo validaciones complejas de los campos solicitados y gestión del sistema de archivos en `/storage/postulantes/` según las reglas de nomenclatura (apellido-nombre-dni) y bloqueo de ejecutables.
**Requirements**: REQ-01, REQ-03, REQ-04

### Phase 4: Foundation Frontend (React/Tailwind) & Dashboard
**Status**: ✅ Complete
**Objective**: Establecer la estructura del proyecto React (Vite) con Tailwind CSS, ruteo básico con react-router, integración con contexto/autenticación para redireccionar `/login`, y consumo de los endpoints para desarrollar el Dashboard de KPI (Chart.js) y el listado de Postulantes.
**Requirements**: REQ-02, REQ-05, REQ-06

### Phase 5: UI Postulantes, Búsqueda Avanzada y Documentos (Full Stack)
**Status**: ✅ Complete
**Objective**: Construir y estilizar el formulario de carga, visualización, y edición del CV del postulante. Consumir correctamente la descarga y modificación de documentos, renderizar las opciones de búsqueda avanzadas y afinar el comportamiento transaccional del sistema.
**Requirements**: REQ-01, REQ-02, REQ-03

### Phase 6: Testing, Polish final y Preparación a Producción
**Status**: ⬜ Not Started
**Objective**: Realizar el empaquetado final, ajustar detalles de la interfaz gráfica y probar la integridad del ciclo completo con comandos `docker-compose`.
**Requirements**: REQ-01, REQ-02, REQ-03, REQ-04, REQ-05, REQ-06, REQ-07, REQ-08, REQ-09, REQ-10, REQ-11
