import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
from bson import ObjectId, json_util
from dao import Dao, DaoException

class Server:

    def __init__(self):
        self.app = flask.Flask(__name__)
        self.dao = Dao()
        CORS(self.app)

    def dbConnect(self):
        try:
            self.dao.connect()
            self.dao.init()
        except DaoException:
            return False
        return True



    def setup(self):

        if not self.dbConnect():
            raise Exception(message="unable to initialize db connection")


        @self.app.route('/api/v1/resources/formlist',methods=['GET'])
        @cross_origin(supports_credentials=True)
        def getFormList():
            result = self.dao.getFormList()
            for f in result:
                if isinstance(f['formId'],ObjectId):
                    f['formId'] = str(f['formId'])
            return jsonify(result)

        @self.app.route('/api/v1/resources/forms/<string:id>', methods=['GET', 'POST'])
        @cross_origin(supports_credentials=True)
        def formById(id):
            if request.method == "GET":
                res = self.dao.getForm(ObjectId(id))
                if "_id" in res.keys():
                    res["_id"] = str(res["_id"])
                return jsonify(res)
            elif request.method == "POST":
                try:
                    formId = self.dao.addForm(json_util.loads(request.data))
                except DaoException:
                    flask.abort(500)
                return jsonify({"success": True, "formId": str(formId)})

        @self.app.route('/api/v1/resources/submissions/<string:id>', methods=['GET', 'POST'])
        @cross_origin(supports_credentials=True)
        def submissionsById(id):
            if request.method == "GET":
                res = self.dao.getSubmissions(id)
                for s in res:
                    s["_id"] = str(s["_id"])
                return jsonify(res)
            elif request.method == "POST":
                try:
                    submissionId = self.dao.addSubmission(json_util.loads(request.data))
                except DaoException:
                    flask.abort(500)
                return jsonify({"success": True, "formId": str(submissionId)})



    def start(self,host="127.0.0.1",port=5000):
        self.app.run(host=host, port = port)

