class BudgetInterface {
  db: Database;
  constructor(db: Database) {
    this.db = db;
  }
  open(): void {};
  save(): void {
    this.db.insert();
  };
}

class Database {
  insert(): void {};
  update(): void {};
  delete(): void {};
}

class BudgetInterface2 {
  db: IDatabase;
  constructor(db: IDatabase) {
    this.db = db;
  }
  open(): void {};
  save(): void {
    this.db.insert();
  };
}

interface IDatabase {
  insert(): void;
  update(): void;
  delete(): void;
}

class MYSQL implements IDatabase {
  insert(): void {};
  update(): void {};
  delete(): void {};
}

class MongoDB implements IDatabase {
  insert(): void {};
  update(): void {};
  delete(): void {};
}

const budgetInterface: BudgetInterface2 = new BudgetInterface2(new MongoDB);
const budgetInterface2: BudgetInterface2 = new BudgetInterface2(new MYSQL);