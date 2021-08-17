# Back-end para el quiz de representación de diputades de Latitud 3°12
El objetivo de este proyecto fue ayudar a las personas a emitir un voto más informado en las elecciones de 2021. Este quiz de representación hace 10 preguntas a une usuarie sobre ciertos temas y, de acuerdo con sus respuestas, le desplegamos el porcentaje de representación de le diputade de su distrito a nivel federal. La página se encuentra en: https://www.reeleccionocambio.com/

## Tecnologías elegidas
Este proyecto fue desarrollado para [Latitud 3°12](https://www.latitud312.com/) y con licencia GNU AGPLv3. El backend-end fue desarrollado con `node@14`, `express@4` y `postgresql@13`. Hacía tiempo que no desarrollaba una aplicación full-stack, por lo que elegí estas tecnologías por su sencillez y la familiaridad que tengo con ellas.

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

