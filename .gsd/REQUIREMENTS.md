# REQUIREMENTS.md

## Format
| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| REQ-01 | **Gestión Integral de Postulantes (CRUD):** Permitir el registro, actualización, baja lógica y física de la información de candidatos. | SPEC Goal 1 | Pending |
| REQ-02 | **Clasificación Multidimensiona:** Permitir la clasificación de los candidatos por lugar, puesto, título, etc. y realizar búsquedas por estos campos. | SPEC Goal 1 | Pending |
| REQ-03 | **Sistema de Archivos Estructurado (Nomenclatura):** Administrar hasta 10 documentos por postulante en `/storage/postulantes/` en carpetas con nomenclatura `Apellido-Nombre-DNI`. Renombrar automáticamente la carpeta si se cambian estos datos. | SPEC Goal 2 | Pending |
| REQ-04 | **Protección de Archivos Ejecutables:** Bloqueo absoluto de archivos `.exe`, `.bat`, `.sh`. | SPEC Constraint | Pending |
| REQ-05 | **Control de Acceso (RBAC):** Implementar roles de usuario (`admin`, `jefe de rrhh`, `staff`) y restringir funciones operativas. | SPEC Goal 3 | Pending |
| REQ-06 | **Dashboard y KPIs:** Proveer una visualización gráfica (Chart.js) de estadísticas clave solicitadas. | SPEC Goal 4 | Pending |
| REQ-07 | **Patrón Repository (DB Flexible):** La base de datos debe soportar tanto MongoDB como PostgreSQL, configurable por variables de entorno `DB_TYPE`. | SPEC Constraint | Pending |
| REQ-08 | **Identificación Interna:** Uso estricto de UUIDs (v4) para identificadores internos de entidades. | SPEC Constraint | Pending |
| REQ-09 | **Seguridad (Autenticación):** Autenticación JWT con expiración, y contraseñas encriptadas con bcrypt (`BCRYPT_SALT`, `BCRYPT_SECRET`). | SPEC Constraint | Pending |
| REQ-10 | **Despliegue y Contenerización:** Contenedores Docker obligatorios (tres entornos: desarrollo, testing, producción mediante `docker-compose.yml`). | SPEC Constraint | Pending |
| REQ-11 | **Data Base Seeding:** Inicializar el sistema con usuarios predeterminados, y los datos requeridos para Puestos, Titulos y Portales (Pandape, Linkedin, ManPower, Referenciado). | SPEC Success | Pending |
