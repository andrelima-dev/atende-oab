-- CreateTable
CREATE TABLE "avaliacoes_oab" (
    "id" SERIAL NOT NULL,
    "nome_advogado" TEXT NOT NULL,
    "numero_ordem" TEXT NOT NULL,
    "processo" TEXT,
    "setor" TEXT NOT NULL,
    "nota_atendimento" INTEGER,
    "nota_clareza" INTEGER,
    "nota_agilidade" INTEGER,
    "nota_cordialidade" INTEGER,
    "nota_eficiencia" INTEGER,
    "comentario" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avaliacoes_oab_pkey" PRIMARY KEY ("id")
);
