-- CreateTable: Tabela de setores
CREATE TABLE "setores" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "setores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "setores_nome_key" ON "setores"("nome");

-- Inserir setores únicos da tabela atual
INSERT INTO "setores" ("nome")
SELECT DISTINCT "setor"
FROM "avaliacoes_oab"
WHERE "setor" IS NOT NULL;

-- AlterTable: Adicionar coluna setor_id com valor padrão temporário
ALTER TABLE "avaliacoes_oab" 
ADD COLUMN "setor_id" INTEGER DEFAULT 1;

-- Atualizar setor_id baseado no nome do setor
UPDATE "avaliacoes_oab" a
SET "setor_id" = s."id"
FROM "setores" s
WHERE a."setor" = s."nome";

-- Remover valor padrão e tornar NOT NULL
ALTER TABLE "avaliacoes_oab" 
ALTER COLUMN "setor_id" DROP DEFAULT,
ALTER COLUMN "setor_id" SET NOT NULL;

-- Alterar tipos das colunas de notas para SmallInt
ALTER TABLE "avaliacoes_oab"
ALTER COLUMN "nota_atendimento" SET DEFAULT 0,
ALTER COLUMN "nota_atendimento" SET DATA TYPE SMALLINT,
ALTER COLUMN "nota_clareza" SET DEFAULT 0,
ALTER COLUMN "nota_clareza" SET DATA TYPE SMALLINT,
ALTER COLUMN "nota_agilidade" SET DEFAULT 0,
ALTER COLUMN "nota_agilidade" SET DATA TYPE SMALLINT,
ALTER COLUMN "nota_cordialidade" SET DEFAULT 0,
ALTER COLUMN "nota_cordialidade" SET DATA TYPE SMALLINT,
ALTER COLUMN "nota_eficiencia" SET DEFAULT 0,
ALTER COLUMN "nota_eficiencia" SET DATA TYPE SMALLINT;

-- AddForeignKey
ALTER TABLE "avaliacoes_oab" ADD CONSTRAINT "avaliacoes_oab_setor_id_fkey" FOREIGN KEY ("setor_id") REFERENCES "setores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropColumn: Remover coluna setor antiga
ALTER TABLE "avaliacoes_oab" DROP COLUMN "setor";
