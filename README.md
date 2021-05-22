# Back-end para el quiz de representación de diputades de Latitud 3°12

## Tecnologías elegidas
Este proyecto fue desarrollado para [Latitud 3°12](https://www.latitud312.com/) y con licencia GNU AGPLv3. El backend-end fue desarrollado con `node@14`, `express@4` y `postgresql@13`.

## Uso y desarrollo
Para poder probar el código localmente, es necesario contar con una versión de `node` LTS y `yarn`.

Primero, es necesario instalar todos los paquetes con el siguiente comando:
```
yarn install
```
Una vez instalados los paquetes, es necesario crear un archivo `.env` en la carpeta raíz del repositorio con los siguientes datos:
```
DB_USER=${usuario de la BD de PostgreSQL}
DB_PASSWORD=${contraseña de la BD de PostgreSQL}
DB_HOST=${host de la BD de PostgreSQL}
DB_PORT=${puerto de la BD de PostgreSQL}
DB_DATABASE=${nombre de la BD de PostgreSQL}

PORT=${puerto del servidor local}
SECRET_SESSION=${llave secreta de la sesión}
DEBUG=${booleano; si está en modo debugging o no}
```
Se deberán sustituir los siguientes fragmentos con los datos correspondientes de la base de datos y el ambiente locales:
- `${usuario de la BD de PostgreSQL}`
- `${contraseña de la BD de PostgreSQL}`
- `${host de la BD de PostgreSQL}`
- `${puerto de la BD de PostgreSQL}`
- `${nombre de la BD de PostgreSQL}`
- `${puerto del servidor local}`
- `${llave secreta de la sesión}`
- `${booleano; si está en modo debugging o no}`

Después de la instalación, el servidor local en ambiente de desarrollo se puede ejecutar con el comando:
```
yarn start:dev
```
Si se quiere ejecutar este servidor como lo haría en modo producción, el comando es:
```
yarn start:dev
```

## Construcción y despliegue
Para traspilar los archivos `.ts` a `.js` es necesario ejecutar el siguiente comando:
```
yarn build
```
Los archivos traspilados se depositarán `@/dist`, donde la `@` es la dirección de la carpeta raíz de este proyecto. Esta aplicación está desplegada en [Heroku](https://heroku.com).

## Endpoints
WIP

## Contribución
Si deseas contribuir a mejorar este proyecto, te pido crees un *Issue* de GitHub y/o crees un Pull Request con los cambios que propones.

