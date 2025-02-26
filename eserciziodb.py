
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import psycopg2

api = Flask(__name__)
CORS(api)

config_connect = {
    'host': 'localhost',
    'port': '5432',
    'dbname': 'accademia',
    'user': 'postgres',
    'password': 'postgres',
}

def ConnectDB():
    return psycopg2.connect(
        host=config_connect['host'],
        port=config_connect['port'],
        dbname=config_connect['dbname'],
        user=config_connect['user'],
        password=config_connect['password']
    )

@api.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@api.route('/persone', methods=['GET'])
def StampaPersone():
    connection = ConnectDB()
    # cursor = connection.cursor()
    query_type = request.args.get('selezione')
    
    try:
        cursor = connection.cursor()
        if query_type == "query 1":
            query = "SELECT nome, cognome, posizione, stipendio FROM persona;"
        elif query_type == "query 2":
            query = "SELECT * FROM attivitanonprogettuale;"
        elif query_type == "query 3":
            query = "SELECT * FROM wp;"
        elif query_type == "query 4":
            query = "SELECT * FROM assenza;"
        else:
            return jsonify({'error': 'Selezione non valida'}), 400
        cursor.execute(query)
        columns = [desc[0] for desc in cursor.description]
        records = cursor.fetchall()
        result = [dict(zip(columns, row)) for row in records]
    finally:
        connection.close()

    return jsonify(result) 

    
if __name__ == '__main__':
    api.run(host="127.0.0.1", port=8080, debug = True)
