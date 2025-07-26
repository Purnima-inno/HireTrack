from fastapi import APIRouter, HTTPException
from app.models import Application
from app.config import MONGO_DB_URI, DATABASE_NAME
from pymongo import MongoClient
from bson import ObjectId

router = APIRouter()
client = MongoClient(MONGO_DB_URI)
db = client[DATABASE_NAME]
collection = db["applications"]

@router.get("/")
def get_applications():
    data = []
    for app in collection.find():
        app["applicationId"] = str(app["_id"])
        app.pop("_id")
        data.append(app)
    return data

# @router.post("/")
# def add_application(application: Application):
#     result = collection.insert_one(application.dict(exclude_unset=True))
#     return {"applicationId": str(result.inserted_id)}
@router.post("/", response_model=Application)
async def create_application(application: Application):
    data = application.dict(exclude_unset=True)  # Makes sure optional missing fields are excluded
    result = collection.insert_one(data)
    data["applicationId"] = str(result.inserted_id)
    return data

@router.put("/{application_id}")
def update_application(application_id: str, application: Application):
    result = collection.update_one(
        {"_id": ObjectId(application_id)},
        {"$set": application.dict(exclude_unset=True)},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"updated": True}

@router.delete("/{application_id}")
def delete_application(application_id: str):
    result = collection.delete_one({"_id": ObjectId(application_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"deleted": True}