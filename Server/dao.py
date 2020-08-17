import pymongo
from enum import Enum


mongosrv = "mongodb+srv://gil:123@cluster0.0w4ms.mongodb.net/SurveyForms?retryWrites=true&w=majority"
class Dao:

    def __init__(self):
        self.client = None
        self.db = None

    def __getitem__(self, item):
        res = None
        try:
            res = self.db[item]
        except:
            raise DaoException(DaoException.Type.DaoIndexError, "Collection not found in DB: " + item)
        return res

    def __del__(self):
        if self.client is not None:
            self.client.close()

    def connect(self):
        try:
            self.client = pymongo.MongoClient(mongosrv)
        except pymongo.errors.ConnectionFailure as e:
            raise DaoException(DaoException.Type.DaoConnectionError, "Could not connect to DB" + e.message)

    def init(self, db = "MainDB"):
        dbList = self.client.list_database_names()
        if "MainDB" not in dbList:
            try:
                self.db = self.client[db]
                collection = self.db["collections"]
                data = {"collectionName": "collections", "description": "Info on collections of MainDB",
                        "structured": True}
                docID = collection.insert_one(data)
                print("insterted ID: " + str(docID.inserted_id))

            except:
                raise DaoException(DaoException.Type.DaoDbCreationError, "Unable to init or find DB: " + db)
        self.db = self.client[db]

    def registerCollection(self, name,description,structured=False):
        collection = self.db["collections"]
        data = {"collectionName": name, "description": description}
        collection.insert_one(data)



    def createFormsCollection(self, first):

        try:
            collection = self["collections"]
            forms = self["forms"]
        except:
            raise DaoException(DaoException.Type.DaoIndexError,"Unable to access collections.")

        try:
            forms.insert_one(first)
            data = {"collectionName": "forms", "description": "E-Forms added", "structured": False}
            docID = collection.insert_one(data)
            print("insterted ID: " + str(docID.inserted_id))
        except:
            raise DaoException(DaoException.Type.DaoCollectionCreationError, "Unable to create Forms collection.")

    def getSubmissionsCount(self, formId):
        count = 0
        try:
            submissions = self["formSubmissions"]
            count = submissions.count_documnets({"formId":formId})
        except:
            pass
        return count

    def getFormList(self):
        result = []
        formList = []
        try:
            forms = self.db["forms"]
            for f in forms.find({},{"_id":1,"name":1}):
                formList.append(f)
        except:
            pass
        for f in formList:
            try:
                entry = {"formId": f["_id"], "name" : f["name"]}
                entry["count"] = self.getSubmissionsCount(f["_id"])
            except:
                continue
            result.append(entry)

        return result

    def addForm(self, form):
        register=False
        forms = self["forms"]
        colList = self.db.list_collection_names()
        if "forms" not in colList:
            register = True
        try:
            res = forms.insert_one(form)
        except:
            raise DaoException(DaoException.Type.DaoInsertionError,"Unable to add form.")
        if register:
            self.registerCollection("forms","E-Forms added")
        return res.inserted_id

    def getForm(self, formId):
        res={}
        try:
            res = self["forms"].find_one({"_id":formId})
        except:
            pass
        return res

    def addSubmission(self, submission):
        register = False
        forms = self["submissions"]
        colList = self.db.list_collection_names()
        if "submissions" not in colList:
            register = True
        try:
            res = forms.insert_one(submission)
        except:
            raise DaoException(DaoException.Type.DaoInsertionError, "Unable to add submission.")
        if register:
            self.registerCollection("submissions", "Submissions collection added")
        return res.inserted_id

    def getSubmissions(self, formId):
        res = []
        try:
            submissions = self["submissions"]
            subById = submissions.find({"_id":formId})
            for s in subById:
                res.append(s)
        except:
            pass
        return res

    def getCollectionsList(self):
        result = []
        try:
            collections = self.db["collections"]
            for c in collections.find():
                result.append(c)
        except:
            pass
        return result



class DaoException(Exception):
    def __init__(self,type,message):
        self.type = type
        self.message = message
        super().__init__(self.message)

    class Type(Enum):
        DaoConnectionError = 1
        DaoInsertionError = 2
        DaoDbCreationError = 3
        DaoCollectionCreationError = 4
        DaoIndexError = 5
        DaoDeletionError = 6


