CREATE TABLE distritos_cp (
    clave_entidad   INT             NOT NULL,
    nombre_entidad  VARCHAR(255)    NOT NULL,
    distrito        INT             NOT NULL,
    cp              VARCHAR(5)      NOT NULL,
    PRIMARY KEY (clave_entidad, cp, distrito)
);