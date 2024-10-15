-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" TEXT,
    "phone" VARCHAR(32),
    "address" VARCHAR(255),
    "role" TEXT NOT NULL DEFAULT 'staff',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passwords" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frames" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "brand" TEXT,
    "description" VARCHAR(255),
    "stock" INTEGER,

    CONSTRAINT "frames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lenses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "type" TEXT,
    "material" TEXT,

    CONSTRAINT "lenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rightEyeSph" DOUBLE PRECISION NOT NULL,
    "rightEyeCyl" DOUBLE PRECISION,
    "rightEyeAxis" INTEGER,
    "rightEyeAdd" DOUBLE PRECISION,
    "leftEyeSph" DOUBLE PRECISION NOT NULL,
    "leftEyeCyl" DOUBLE PRECISION,
    "leftEyeAxis" INTEGER,
    "leftEyeAdd" DOUBLE PRECISION,
    "frameId" TEXT,
    "lensId" TEXT,
    "price" DOUBLE PRECISION,
    "framePrice" DOUBLE PRECISION,
    "lensPrice" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "passwords_userId_key" ON "passwords"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "frames_name_key" ON "frames"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lenses_name_key" ON "lenses"("name");

-- AddForeignKey
ALTER TABLE "passwords" ADD CONSTRAINT "passwords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "frames"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_lensId_fkey" FOREIGN KEY ("lensId") REFERENCES "lenses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
