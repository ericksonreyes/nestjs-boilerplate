-- CreateTable
CREATE TABLE "EventLogs" (
    "id" SERIAL NOT NULL,
    "event_name" VARCHAR(150) NOT NULL,
    "model_name" VARCHAR(100) NOT NULL,
    "model_id" INTEGER NOT NULL,
    "event_data" JSON NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" VARCHAR(100) NOT NULL,

    CONSTRAINT "EventLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventLogs_created_at_idx" ON "EventLogs"("created_at");

-- CreateIndex
CREATE INDEX "EventLogs_created_by_idx" ON "EventLogs"("created_by");
