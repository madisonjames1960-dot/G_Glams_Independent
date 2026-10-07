from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.auth import router as auth_router
from app.api.products import router as products_router
from app.api.reviews import router as reviews_router
from app.api.orders import router as orders_router
from app.api.uploads import router as uploads_router
from app.db import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="G_Glams Naturals API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth_router)
app.include_router(products_router)
app.include_router(reviews_router)
app.include_router(orders_router)
app.include_router(uploads_router)


@app.get("/")
def root():
    return {
        "name": "G_Glams Naturals API",
        "status": "running",
    }


@app.get("/api/health")
def health():
    return {
        "status": "healthy",
        "environment": "development",
    }
