import pymysql

DB_HOST = "telematicadb.c700ou6gm2om.us-east-2.rds.amazonaws.com"
DB_USER = "telematicaDB"
DB_PASSWORD = "telematica25"
DB_NAME = "telematicaDB"

def get_connection():
    return pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )

def create_database_and_table():
    conn = get_connection()
    cursor = conn.cursor()
    # Crear base de datos si no existe
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
    cursor.execute(f"USE {DB_NAME}")
    # Crear tabla usuarios si no existe
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user VARCHAR(50) NOT NULL UNIQUE,
            mail VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    """)
    conn.close()

# Ejecutar al importar para asegurar que la tabla exista
create_database_and_table()