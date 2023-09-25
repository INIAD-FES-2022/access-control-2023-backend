-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_program_id_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_user_id_fkey";

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;
