import pymysql
import bcrypt

# Configuración de la base de datos
db = pymysql.connect(
    host="telematicadb.c700ou6gm2om.us-east-2.rds.amazonaws.com",
    user="telematicaDB",
    password="telematica25",
    database="telematicaDB",
    port=3306
)

usuarios = [
    ("carlos.gomez", "carlos.gomez@email.com", "Password123!"),
    ("maria.lopez", "maria.lopez@email.com", "Password123!"),
    ("juan.perez", "juan.perez@email.com", "Password123!"),
    ("laura.martinez", "laura.martinez@email.com", "Password123!"),
    ("andres.sanchez", "andres.sanchez@email.com", "Password123!"),
    ("sofia.torres", "sofia.torres@email.com", "Password123!"),
    ("diego.ramirez", "diego.ramirez@email.com", "Password123!"),
    ("valentina.ruiz", "valentina.ruiz@email.com", "Password123!"),
    ("lucas.morales", "lucas.morales@email.com", "Password123!"),
    ("camila.fernandez", "camila.fernandez@email.com", "Password123!")
]

try:
    with db.cursor() as cursor:
        for username, correo, password in usuarios:
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            sql = "INSERT INTO users (user, mail, password) VALUES (%s, %s, %s)"
            cursor.execute(sql, (username, correo, hashed.decode('utf-8')))
        db.commit()
    print("Usuarios insertados correctamente.")
except Exception as e:
    print("Error:", e)
finally:
    db.close()