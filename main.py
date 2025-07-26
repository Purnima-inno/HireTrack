from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.applications import router as applications_router

app = FastAPI()

# Allow frontend access during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register router
app.include_router(applications_router, prefix="/api/applications")