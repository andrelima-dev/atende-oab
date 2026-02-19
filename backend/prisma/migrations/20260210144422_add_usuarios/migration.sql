/*
  Warnings:

  - Made the column `nota_atendimento` on table `avaliacoes_oab` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nota_clareza` on table `avaliacoes_oab` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nota_agilidade` on table `avaliacoes_oab` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nota_cordialidade` on table `avaliacoes_oab` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nota_eficiencia` on table `avaliacoes_oab` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `avaliacoes_oab` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "avaliacoes_oab" ALTER COLUMN "nota_atendimento" SET NOT NULL,
ALTER COLUMN "nota_clareza" SET NOT NULL,
ALTER COLUMN "nota_agilidade" SET NOT NULL,
ALTER COLUMN "nota_cordialidade" SET NOT NULL,
ALTER COLUMN "nota_eficiencia" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
