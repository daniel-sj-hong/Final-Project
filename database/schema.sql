set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Favorites" (
	"details" json NOT NULL,
	"favoritesId" serial NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Categories" (
	"name" TEXT NOT NULL,
	"icon" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);
