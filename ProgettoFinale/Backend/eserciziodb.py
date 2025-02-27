
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
import psycopg2
import json

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
    query_type = request.args.get('selezione')
    
    if query_type == "query 1":
        try:
            with open("persone.json", "r", encoding="utf-8") as file:
                data = json.load(file)
            result = [{"nome": item[1], "cognome": item[0], "posizione": item[2], "stipendio": item[3]} for item in data]
            return jsonify(result)
        except Exception as e:
            return jsonify({'error': f'Errore nella lettura del file JSON: {str(e)}'}), 500
    
    if query_type == "query 2":
        try:
            with open("attivitanProg.json", "r", encoding="utf-8") as file:
                data = json.load(file)
            result = [{"id": item[0], "giorno": item[1], "oredurata": item[2], "persona": item[3], "tipo": item[4]} for item in data]
            return jsonify(result)
        except Exception as e:
            return jsonify({'error': f'Errore nella lettura del file JSON: {str(e)}'}), 500
    
    if query_type == "query 3":
        try:
            with open("assenze.json", "r", encoding="utf-8") as file:
                data = json.load(file)
            result = [{"id": item[0], "persona": item[1], "tipo": item[2], "giorno": item[3]} for item in data]
            return jsonify(result)
        except Exception as e:
            return jsonify({'error': f'Errore nella lettura del file JSON: {str(e)}'}), 500
    
    connection = ConnectDB()
    try:
        cursor = connection.cursor()
        
        cursor.execute()
        columns = [desc[0] for desc in cursor.description]
        records = cursor.fetchall()
        result = [dict(zip(columns, row)) for row in records]
    finally:
        connection.close()

    return jsonify(result) 

if __name__ == '__main__':
    api.run(host="127.0.0.1", port=5010, debug=False)
