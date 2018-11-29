USE studyspace;
CREATE TABLE Users
(
  ID        int,
  Username  varchar(255) NOT NULL,
  Passwd    varchar(255) NOT NULL,
  Email     varchar(255) NOT NULL,
  PicPath   varchar(255) NOT NULL
);