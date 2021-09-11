set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Restaurants" (
	"details" json NOT NULL,
	"favoritesId" integer NOT NULL,
	"businessId" serial NOT NULL,
	CONSTRAINT "Restaurants_pk" PRIMARY KEY ("businessId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Categories" (
	"name" TEXT NOT NULL,
	"icon" TEXT NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Favorites" (
	"businessId" integer NOT NULL,
	"favoritesId" integer NOT NULL,
	CONSTRAINT "Favorites_pk" PRIMARY KEY ("favoritesId")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "Restaurants" ADD CONSTRAINT "Restaurants_fk0" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("favoritesId");


ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_fk0" FOREIGN KEY ("businessId") REFERENCES "Restaurants"("businessId");
