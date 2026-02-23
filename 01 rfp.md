# Rol de la IA: Asume el rol de Arquitecto de Software Senior y Desarrollador Fullstack.


# Especificación técnica: SISTEMA HR-TALENT 
Actúa como un Arquitecto de Software Senior y Desarrollador Fullstack. Debes construir una aplicación web profesional y modular siguiendo rigurosamente los requerimientos detallados a continuación, con código fuente completo, modular y listo para producción.

## 1. Objetivo de la aplicación

Desarrollar una aplicación para el área de Recursos Humanos que permita gestionar el ciclo de vida de los postulantes (CRUD). La aplicación debe facilitar la registración y mantenimiento de la información de los postulantes. Debe permitir la clasificación de los candidatos por lugar de residencia, puesto al que se postulan, título universitario, habilitades técnicas, resultado final de las entrevista, y cualquier otra clasificación que RRHH considere relevante. Se deben poder realizar busquedas por título, por provincia de residencia, por puesto, por fecha de entrevista, por resultado de la entrevista, por estado de contacto, por estado de confirmación, por asistencia a la entrevista, por resultado de la entrevista, por referencia de la búsqueda, por portal de búsqueda, por evaluación final. Debe tener un Dashboard con los principales KPIs de clasificacion mencionados, por ejemplo: Cantidad de cantidatos por provincia, cantidad de candidatos con evaluación final aprobada y sin categorizar, cantidad de postulantes por título universitario, cantidad de postulantes por puesto y todos los que RRHH crea necesarios.
La aplicación tendrá un acceso mediante usuario y contraseña. Cada usuario debe tener un rol que le permitirá hacer determinadas operaciones en la aplicación y le negará otras.

## 2. Entidades

### Postulantes

- La información básica incluye: Apellido, Nombre, DNI, edad, Provincia (Buenos Aires, Catamarca, Chaco, Chubut, CABA, Córdoba, Corrientes, Entre Ríos, Formosa, Jujuy, La Pampa, La Rioja, Mendoza, Misiones, Neuquén, Río Negro, Salta, San Juan, San Luis, Santa Cruz, Santa Fe, Santiago del Estero, Tierra del Fuego, Tucumán), Teléfono, teléfono de contacto, persona de contacto, email, DNI, fecha de nacimiento, lugar de nacimiento, estado civil, nacionalidad, género (Masculino, Femenino, No Binario, Sin Categorizar). 

- La información de estudios incluye: título principal (ó de grado, detallados en el anexo) y universidad, título secundario, título de posgrado, título terciario.   

- La información sobre la entrevista incluye:  hora de la entrevista, asistencia a la entrevista (presenta, ausente, sin categorizar), estado de entrevista (Confirma, desiste, no responde, volver a contactar, sin Categorizar), estado de contacto (Contactado, Sin contactar), resultado de la entrevista (Excelente, Muy Bueno, Bueno, Regular, Malo, sin Calificar), referencia de la búsqueda (puede ser una combinacion de letras y número que agrupen a los postulantes por un lugar y fecha de entrevista, o una referencia a una busqueda de un perfil determinado de postulante), portal de busqueda (debajo se detalla), evalualción del cv (Aprobado, No Aprobado, Sin Categorizar), fecha de aprobación del cv, resultado final (Aprobado, No Aprobado, Sin Categorizar), Observaciones (texto libre)

- información adicional incluye: documentos adicionales como Documentos de Word, imagenes o PDFs con los Curriculums, las fotos para el legajo y los DNI (documento nacional de identidad) con un máximo de 10 documentos por postulante. Estos documentos no deben almacenarse en la base de datos, deben guardarse en una carpeta del servidor donde se contruya la aplicación y se alojará en /storage/postulantes/. Cada postulante generará una carpeta en esa ubicación y como nombre de carpeta se usará la siguiente nomenclatura: Apellido-Nombre-DNI del postulante. En caso que RRHH suba más documentos relacionados con el postulante: Si el documento existe, será reemplazado por el nuevo. Si cambia el apellido, Nombre o DNI del postulante hay que reemplazar todas las referencias del nombre de carpeta del postulante. RRHH debe poder acceder a los documentos subidos del postulante a través de la apliación para descargarlos.

- Se debe poder subir una foto del postulante que será almacenda en la misma carpeta /storage/postulantes/ con la misma nomenclatura usada en los documentos del punto anterior: Apellido-Nombre-DNI del postulante. si no se carga ninguna foto se tomará una imagen genérica a modo de avatar para que tenga una imagen de cualquier manera.

### Usuarios
Apellido, Nombre, Password (encriptada en la Base de datos), rol (los roles está detallados debajo)

### Roles
admin: Tiene acceso irrestricto a toda la aplicación, crear, actualizar, eliminar logicamente (se marca el registro como eliminado) y eliminar físicamente cualquier registro (la eliminación física incluye el borrado de la carpeta de documentos del postulante).
jefe de rrhh: los mismos permisos que el rol 'admin' pero no puede eliminar ningún registro físicamente. Hace ademas el manteniminento de todas las entidades adicionales de soporte a los postulantes (puestos, títulos, etc.)
staff: solo puede acceder a la aplicación, ver los registros, hacer busquedas, pero no puede crear, modificar o eliminar ningún registro de postulantes. 

### Puestos
SUPERVISOR DE PRODUCCIÓN,AUDITOR DE CALIDAD,AUTOMATIZACION ,AUTOMATIZACION Y CONTROL,CALIDAD,COMPRADOR,DESARROLLO,DESARROLLO DE PRODUCTO,DISEÑO MECANICO,DISEÑO Y DESARROLLO DE PRODUCTO,GERENTE,GERENTE DE MANTENIMIENTO,GERENTE DE MANTENIMIENTO MECANICO,GERENTE DE MTTO,GERENTE DE PLANTA,GERENTE DE PRODUCCIÓN,GERENTE DE PRODUCCIÓN/MTTO,GESTION DE TALLER AUTOMOTRIZ,GTE. PRODUCCIÓN,INFRAESTRUCTURA INDUSTRIAL,INFRAESTRUCTURA IT,ING. DE PROCESOS,ING. EN AUTOMATIZACIÓN,ING. EN PROCESOS,ING. PROCESOS,INGENIERO DE PROCESOS,INGENIERO DE PRODUCTO,INGENIERO DE PROYECTOS,INGENIERO DE TENSIONES,INGENIERO EN PROCESOS,INGENIERO INDUSTRIAL,INGENIERO PIPING,INGENIERO PROCESOS,INVESTIG. Y DESARROLLO,INVESTIGACION Y DESARROLLO,JEFE DE CALIDAD,JEFE DE INVESTIGACION Y DESARROLLO,JEFE DE MANTENIMIENTO,JEFE DE MANTENIMIENTO ELECTRICO,JEFE DE MANTENIMIENTO ELETRICO,JEFE DE MANTENIMIENTO MECANICO  ,JEFE DE MANTENIMIENTO MECÁNICO,JEFE DE MANTENIMIENTO MECANICO/ELECTRICO,JEFE DE PLANTA,JEFE DE PRODUCCION,JEFE DE PRODUCCIÓN,JEFE DE SISTEMAS,JEFE MANTENIMIENTO ELECTRICO,JEFE SGI,JOVEN PROFESIONAL,MANTENIMEINTO MECANICO,MANTENIMIENTO,MANTENIMIENTO ELECTRCIO,MANTENIMIENTO ELECTRICO  ,MANTENIMIENTO ELECTRICO/MECANICO,MANTENIMIENTO ELECTROMECÁNICO,MANTENIMIENTO INDUSTRIAL,MANTENIMIENTO MECANICO,MANTENIMIENTO MECÁNICO,MANTENIMIENTO MECANICO/ELECTRICO,MATERIALES,MATRICERÍA,MECANICO,MTTO,MTTO ELECTROMECANICO,MTTO INDUSTRIAL,MTTO MECANICO,MTTO MECNICO/ELECTRICO,OFICIAL MECANICO,OPERARIO,PROCESOS-SUPERVISOR,PRODUCCIÓN,PROYECTISTA,SGI,SUP. DE MANTENIMIENTO,SUP. DE PRODUCCIÓN,SUP. DE PRODUCCIÓN,SUP. MANTENIMIENTO,SUP. PRODUCCION,SUP. PRODUCCIÓN,SUPERVISOR DE MANTENIMIENTO,SUPERVISOR DE MANTENIMIENTO  ELECTRICO,SUPERVISOR DE MANTENIMIENTO ELECTRICO,SUPERVISOR DE MANTENIMIENTO MECANICO,SUPERVISOR DE PLANTA,SUPERVISOR DE PRODUCCION,SUPERVISOR DE PRODUCCIÓN,SUPERVISOR MANTENIMIENTO MECÁNICO

### Títulos
CALIDAD GESTION INT. DE LOS PROCESOS,DISEÑO INDUSTRIAL,ELECTRICISTA CATEGORIA 3,ELECTRICISTA INDUSTRIAL,iINGENIERO AERONAUTICO,INENIERO ELECTROMECANICO (NO GRADUADO),ING. ELECTROMECANICO,ING. EN AUTOMATIZACIÓN Y CONTROL,ING. INDUSTRIAL,ING. MANTENIMIENTO MECANICO,INGENIERA MECANICA (POR FINALIZAR),INGENIERA QUIMICA,INGENIERIA AERONAUTICA,INGENIERIA MECANICA (EN CURSO),INGENIERIA QUIMICA,INGENIERO AERONAUTICO,INGENIERO CIVIL,INGENIERO DE MANTENIMIENTO INDUSTRIAL,INGENIERO DE MANTENIMIENTO MECANICO,INGENIERO DE MATERIALES,INGENIERO ELECTRICISTA,INGENIERO ELECTRICO,INGENIERO ELECTRICO (EN CURSO),INGENIERO ELECTRICO (INCOMPLETO),INGENIERO ELECTROMECANICO,INGENIERO ELECTROMECÁNICO,INGENIERO ELECTRONICO,INGENIERO ELECTRÓNICO,INGENIERO ELECTRONICO (EN CURSO),INGENIERO ELECTRONICO (INCOMPLETO),INGENIERO EN ELECTRONICA,INGENIERO EN MANTENIMIENTO,INGENIERO EN MANTENIMIENTO INDUSTRIAL,INGENIERO EN MANTENIMIENTO MECANICO,INGENIERO EN MATERIALES,INGENIERO EN MECANICA INDUSTRIAL,INGENIERO EN PETROLEO,INGENIERO EN PROCESOS INDUSTRIALES,INGENIERO EN SISTEMAS,INGENIERO INDUSTRIAL,INGENIERO INDUSTRIAL (ABANDONADO),INGENIERO INDUSTRIAL (EN CURSO),INGENIERO INDUSTRIAL (HASTA 4°AÑO),INGENIERO INDUSTRIAL (INCOMPLETO),INGENIERO MANTENIMIENTO,INGENIERO MECANICO,INGENIERO MECÁNICO,INGENIERO MECANICO  AERONAUTICO,INGENIERO MECANICO (4° A),INGENIERO MECANICO (EN CURSO),INGENIERO MECANICO (INCOMPLETO),INGENIERO MECANICO AERONAUTICO,INGENIERO MECANICO ELECTRICISTA,INGENIERO MECANICO?,INGENIERO MECANICO0 EN AUTOMOTORES,INGENIERO MECATRONICO,INGENIERO METALURGICO,INGENIERO NAVAL Y MECANICO,INGENIERO QUIMICO,INGENIERO QUIMICO (EN CURSO),INGENIERO QUIMICO (RESTA 1 MATERIA),LIC. EN AUTOMATIZACION Y CONTROL,LIC. EN AUTOMATIZACION Y CONTROL (EN CURSO),LIC. EN AUTOMATIZACION Y ROBOTICA,LIC. EN COMERCIO INT.,LIC. EN COMERCIO INTERNACIONAL,LIC. EN GESTION LOGISTICA,LIC. EN QUIMICA,LIC. EN QUIMICA Y BIOQUIMICO,LIC. SIST. AUTOMATIZACION Y ROBOTICA,LICENCIADO EN AUTOMATIZACION Y CONTROL (EN CURSO),LICENCIADO EN QUIMICA,LICENCIATURA EN CIENCIAS QUIMICAS,NO EGRESADO,QUIMICO INDUSTRIAL,TEC. ELECTRICISTA,TEC. ELECTRICO,TEC. ELECTROMECANICO,TEC. ELECTROMECÁNICO,TEC. ELECTRONICO,TEC. EN AUTOMATIXACIÓN Y ROBOTICA,TEC. EN AUTOMATIZACION Y ROBOTICA,TEC. EN ELECTRONICA,TEC. EN INSTALACIONES ELECTROMECANICAS,TEC. EN MANTENIMIENTO,TEC. EN MANTENIMIENTO INDUSTRIAL,TEC. EN PROCESOS PRODUCTIVOS,TEC. EN PRODUCCION DE BIENES Y SERVICIO,TEC. MAYOR DE OBRA,TEC. MECAICO ELECTRICISTA,TEC. MECANICO ,TEC. MECÁNICO,TEC. MECANICO ELECTRICISTA,TEC. MECANICO EN MAQUINAS Y HERRAMIENTAS,TEC. QUIMICO,TEC. SUP EN MOLDES MATRICES Y DISPOSITIVOS,TEC. SUP UNIV EN PROCESOS PRODUCTIVOS,TEC. SUPERIOR,TEC. SUPERIOR EN GRANDES MOLDES,TEC. SUPERIOR EN MANTENIMIENTO,TEC. TECNOLOGICO,TEC.MECANICO,TECNICO EECTONICO,TECNICO ELECTROMECANICO,TECNICO ELECTROMECÁNICO,TECNICO ELECTRONICO,TECNICO ELECTRÓNICO,TECNICO EN ELECTRICIDAD INDUSTRIAL,TECNICO EN MANTENIMIENTO INDUSTRIAL,TECNICO EN MANTENIMIENTO MECANICO,TECNICO EN PROCESOS PRODUCTIVOS,TECNICO EN SERGURIDAD E HIGIENE,TECNICO INDUSTRIAL,TECNICO MECANICO,TECNICO MECANICO ELECTRICISTA,TECNICO METALMECANICO,TECNICO METALURGICO,TECNICO PERSONAL Y PROFESIONAL EN INFORMATICA,TECNICO QUIMICO

* Todas las entidades deben tener campos adicionales para auditoría de registros: Fecha de creación (dateadd), usuario que creó (useradd), fecha de modificacion (dateupd), usuario que modificó, eliminado (true,false), fecha de eliminación(datedel), usuario de eliminación (userdel), fecha eliminación física (datedelph), usuario que eliminó físicamente (userdelph)

## 3. Arquitectura

- **Backend:** Node.js + Express. Arquitectura limpia (Capas: Controllers, Services, Repositories).
- **Frontend:** React.js (Vite) + Tailwind CSS. Gestión de estado con Context API. (Componentes funcionales, Hooks, Context API o Redux).
- **Base de Datos:** Implementar patrón Repository para alternar entre **MongoDB** o **PostgreSQL** según variable `DB_TYPE`. Usar **UUID v4** para todos los IDs internos.
- **Entorno:** Contenedores **Docker** (Dockerfile y docker-compose.yml)
- **Seguridad:** Autenticación JWT con expiración de sesión. Password hashing con bcrypt. Separación en capas: API (REST) y APP (Frontend).
- **JWT:** Sesión con expiración configurable. Redirección automática a `/login` al expirar.

- El código fuente de la aplicación debe ser claro, simple y con separación modular respecto a sus funciones. Debe tener separada la configuración de variables de entorno para dar flexibilidad (cadena de conexión a la base de datos, puerto de la API, etc.) Un ejemplo de la separación modular podría ser la siguiente sugerencia (aunque no es obligatoria):

### ESTRUCTURA DE ARCHIVOS DE EJEMPLO
```text
/rh-postulantes
 ├── api (Backend: controllers, middlewares, models, requests, tests, utils, json, docs, .env, readme.md)
 ├── app (Frontend: components, services, utils, hooks, context, .env, readme.md)
 ├── storage/postulantes (Carpeta local para archivos de postulantes)
 └── docker-compose.yml
```

en api/controllers pueden estar los controladores de los diferentes módulos
en api/models pueden estar los modelos de los diferentes módulos
en api/requests pueden estar ejemplos de las llamadas a las api usando REST Client en formato .http.
en api/middleware pueden estar los middlewares generales
en api/tests pueden estar los tests de los diferentes módulos
en api/utils pueden estar las utils de los diferentes módulos
en api/docs pueden estar las docs de los diferentes módulos
en api/json pueden estar los json de prueba para carga de diferentes entdades
en app/components pueden estar los componentes de los diferentes módulos
en app/services pueden estar los servicios de los diferentes módulos
en app/utils pueden estar las utils de los diferentes módulos
en app/docs pueden estar las docs de los diferentes módulos

- El despliegue de la aplicación se debe hacer usando docker. 

- Crer 3 versiones de la base de datos, una de desarrollo, una de testing y una de producción e incluir en el docker-compose.yml y en los archivos de entorno la posibilidad de elegir la versión a usar.


## 4. GESTIÓN DE ARCHIVOS (FILE SYSTEM)
- **Ruta Raíz:** `/storage/postulantes/`.
- **Estructura:** Cada postulante tendrá una carpeta propia con nombre `Apellido-Nombre-DNI`.
- **Nomenclatura Dinámica:** Carpeta basada en `Apellido-Nombre-DNI`.
- **Documentos:** Máximo 10 archivos por postulante (CV, Fotos, DNI). Formatos permitidos: PDF, Word, JPG, PNG.
- **Foto de Perfil:** Se almacena en la misma carpeta. Si no existe, mostrar avatar genérico.
- **Reglas de Negocio:** - Bloqueo estricto de archivos ejecutables (`.exe`, `.bat`, `.sh`).
    - Si se sube un documento con nombre existente, el sistema debe reemplazarlo automáticamente.
- **Integridad Física:** Si se edita el Apellido, Nombre o DNI del postulante, el sistema debe **renombrar automáticamente la carpeta en el servidor** para mantener la vinculación. Generar los permisos de escritura sobre el volumen montado en /storage. Generar el código de fs.renameSync o similar para manejarlo.
- **Seguridad:** Bloqueo de archivos ejecutables (`.exe, .bat, .sh`). Límite de 10 archivos. Foto de perfil obligatoria (o avatar genérico).

## 5. CONFIGURACIÓN (VARIABLES DE ENTORNO)
El sistema debe estar preparado para deploy mediante un archivo `.env` que contenga:
- `PORT`: Puerto de la API.
- `DB_TYPE`: (mongodb | postgres).
- `DB_URI`: Cadena de conexión a la base de datos.
- `JWT_SECRET`: Clave secreta para tokens.
- `BCRYPT_SALT`: Factor de costo para encriptación (ej: 10).
- `BCRYPT_SECRET`: Palabra secreta usada para encriptar
- `SESSION_EXPIRES`: Tiempo de expiración (ej: 30m).
- `STORAGE_PATH`: Ruta física de los archivos de postulantes.
- `CORS_ORIGIN`: URL del frontend para seguridad en producción.

## 6. DASHBOARD Y UI
Visualización mediante gráficos (ej. Chart.js) de:
- Cantidad de candidatos por provincia.
- Candidatos con evaluación aprobada vs. Sin categorizar.
- Cantidad de postulantes por Título Universitario.
- Cantidad de postulantes por Puesto.
- Interfaz de búsqueda avanzada con filtros por referencia, puesto, provincia, título de grado, estado, etc.

## 7. Diseño del Front-END
El diseño del Front-END debe ser profesional y moderno, con un diseño limpio y ordenado. Debe seguir las mejores prácticas de diseño de interfaces de usuario, con un diseño responsivo que se adapte a diferentes tamaños de pantalla. Debe seguir las mejores prácticas de diseño de interfaces de usuario, con un diseño responsivo que se adapte a diferentes tamaños de pantalla. Puedes basarte en los ejemplos de la carpeta 'design' que está dentro del proyecto para tomar ideas de diseño ('ejemplo 00.png', 'ejemplo 01.png', 'ejemplo 02.png', 'ejemplo 03.png','ejemplo 04.png','ejemplo 05.png'). Si necesitas un logo de la organización en la misma carpeta 'design' hay un logo (logo-tubhier.png) que puedes usar.

Puedes realizar todas las preguntas que consideres necesarias para llevar a cabo el proyecto.