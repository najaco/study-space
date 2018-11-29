USE studyspace; /* Select Database*/
CREATE TABLE Reviews(
  ID        int,
  LocName   varchar(255) NOT NULL,
  Username  varchar(255) NOT NULL,
  Header    varchar(255),
  Body      varchar(255),
  Rating    int NOT NULL,
  TMSTMP    varchar(255)
);

