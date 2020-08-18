import flask
from flask import request, jsonify
from bson import ObjectId, json_util
from dao import Dao, DaoException
import sys


dao = Dao()
app = flask.Flask(__name__)


if __name__ == "__main__":

    try:
        dao.connect()
        dao.init()
        print("DB connected")
        sys.stdout.flush()
    except DaoException as e:
        print(e.message)
        sys.stdout.flush()
    except Exception as e:
        print(e.message)
        sys.stdout.flush()
    app.run(host="0.0.0.0",port=8080)