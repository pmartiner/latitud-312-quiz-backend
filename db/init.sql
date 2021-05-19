CREATE TABLE distritos_seccion (
    id                  uuid            NOT NULL    DEFAULT uuid_generate_v4 (),
    entidad             INT             NOT NULL,
    nombre_entidad      VARCHAR(255)    NOT NULL,
    distrito            INT             NOT NULL,
    municipio           INT             NOT NULL,
    nombre_municipio    VARCHAR(255)    NOT NULL,
    seccion             INT             NOT NULL,
    tipo                VARCHAR(255)    NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE diputade (
    bancada_original    VARCHAR(255)    NOT NULL,
    nombre_diputade     VARCHAR(255)    NOT NULL,
    entidad             VARCHAR(255)    NOT NULL,
    num_entidad         INT             NOT NULL,
    num_distrito        INT             NOT NULL,
    distrito            VARCHAR(255)    NOT NULL,
    tipo                VARCHAR(255)    NOT NULL,
    id_legislativo      INT             NOT NULL,
    bancada_actual      VARCHAR(255)    NOT NULL,
    reeleccion          BOOLEAN         NOT NULL,
    reeleccion_suplente BOOLEAN         NOT NULL,
    licencia            BOOLEAN         NOT NULL,
    licencia_deceso     BOOLEAN         NOT NULL,
    nombre_suplente     VARCHAR(255)    NOT NULL,
    foto                VARCHAR(255)    NOT NULL,
    PRIMARY KEY (id_legislativo)
);