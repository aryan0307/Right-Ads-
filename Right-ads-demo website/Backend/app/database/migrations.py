from sqlalchemy import inspect, text

from app.database.connection import engine

MIGRATIONS = [
    ("contact_messages", "status", "VARCHAR(50) DEFAULT 'Pending'"),
]


def run_migrations():
    inspector = inspect(engine)
    existing_tables = inspector.get_table_names()

    with engine.begin() as conn:
        for table, column, col_type in MIGRATIONS:
            if table not in existing_tables:
                continue
            columns = [c["name"] for c in inspector.get_columns(table)]
            if column not in columns:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {column} {col_type}"))
                conn.execute(text(f"UPDATE {table} SET {column} = 'Pending' WHERE {column} IS NULL"))
            else:
                conn.execute(text(f"UPDATE {table} SET {column} = 'Pending' WHERE {column} IS NULL OR {column} = ''"))
