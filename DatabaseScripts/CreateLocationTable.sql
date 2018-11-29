USE studyspace;
CREATE TABLE Locations
(
  ID        int,
  Street    varchar(255),
  City      varchar(255),
  StateAb   varchar(255),
  ZIPCode   varchar(255),
  LocName   varchar(255) NOT NULL,
  ShortName varchar(255) NOT NULL
);