import { serial } from "drizzle-orm/mysql-core";
import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

const LeadTable = pgTable("table", {
  id: serial("id").primaryKey().notNull(),
  email: text("email").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export default LeadTable;
