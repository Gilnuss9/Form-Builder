import pymongo
import server



LOCAL = True
if __name__ == '__main__':
    # client = None
    # attempts = 0
    # while client is None and attempts < 5:
    #     client = getConnection()
    #     attempts+=1
    # dbList = client.list_database_names()
    # if "MainDB" not in dbList:
    #     success = createMainDB(client)
    # else:
    #     success = True
    # if success:
    #     col = getCollectionRef(client,"MainDB","collections")
    #     test = col.find_one()
    #     print("first document: " + str(test))
    #     collections = col.find()
    #     for x in collections:
    #         print("document: " + str(x))
    # else:
    #     print("Error creating accessing/creating MainDB")


    sv = server.Server()
    sv.setup()
    print("Server Start")
    if LOCAL:
        sv.start()
    else:
        sv.start("0.0.0.0",8080)
    print("Server Down")
    #client.close()


