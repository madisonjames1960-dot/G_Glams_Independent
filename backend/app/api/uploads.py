import os
from io import BytesIO

import cloudinary
import cloudinary.uploader

from fastapi import APIRouter, UploadFile, File, HTTPException, Depends

from app.admin_auth import require_admin

router = APIRouter(prefix="/api/uploads", tags=["Uploads"])

ALLOWED_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
}

MAX_FILE_SIZE = 10 * 1024 * 1024


@router.post("")
async def upload_image(
    file: UploadFile = File(...),
    admin=Depends(require_admin),
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG, WEBP and GIF images are allowed."
        )

    cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
    api_key = os.getenv("CLOUDINARY_API_KEY")
    api_secret = os.getenv("CLOUDINARY_API_SECRET")

    if not all([cloud_name, api_key, api_secret]):
        raise HTTPException(
            status_code=503,
            detail="Cloudinary storage is not configured."
        )

    content = await file.read(MAX_FILE_SIZE + 1)

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="Image must be 10MB or smaller."
        )

    try:
        cloudinary.config(
            cloud_name=cloud_name,
            api_key=api_key,
            api_secret=api_secret,
            secure=True,
        )

        result = cloudinary.uploader.upload(
            BytesIO(content),
            folder="g_glams/products",
            resource_type="image",
        )

        return {
            "filename": result.get("public_id"),
            "url": result["secure_url"],
        }

    except Exception:
        raise HTTPException(
            status_code=502,
            detail="Image upload to Cloudinary failed. Please try again."
        )
