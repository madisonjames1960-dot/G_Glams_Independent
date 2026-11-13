from urllib.parse import urlparse

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db import get_db, SiteSetting
from app.admin_auth import require_admin

router = APIRouter(prefix="/api/site-content", tags=["Site Content"])


class ImageSetting(BaseModel):
    image_url: str


class SocialFeedSettings(BaseModel):
    instagram_url: str | None = None
    tiktok_url: str | None = None


def save_setting(db, key, value):
    setting = db.query(SiteSetting).filter(
        SiteSetting.key == key
    ).first()

    if setting:
        setting.value = value
    else:
        db.add(SiteSetting(key=key, value=value))


def validate_social_url(value, allowed_hosts, platform):
    value = (value or "").strip()

    if not value:
        return None

    parsed = urlparse(value)

    if parsed.scheme != "https" or parsed.hostname not in allowed_hosts:
        raise HTTPException(
            status_code=400,
            detail=f"Enter a valid {platform} URL."
        )

    return value


@router.get("/about-image")
def get_about_image(db: Session = Depends(get_db)):
    setting = db.query(SiteSetting).filter(
        SiteSetting.key == "about_image"
    ).first()

    return {"image_url": setting.value if setting else None}


@router.put("/about-image")
def update_about_image(
    data: ImageSetting,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    image_url = data.image_url.strip()

    if not image_url.startswith("https://"):
        raise HTTPException(
            status_code=400,
            detail="A secure image URL is required."
        )

    save_setting(db, "about_image", image_url)
    db.commit()

    return {"image_url": image_url, "message": "About image saved."}


@router.get("/hero-image")
def get_hero_image(db: Session = Depends(get_db)):
    setting = db.query(SiteSetting).filter(
        SiteSetting.key == "hero_image"
    ).first()

    return {"image_url": setting.value if setting else None}


@router.put("/hero-image")
def update_hero_image(
    data: ImageSetting,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    image_url = data.image_url.strip()

    if not image_url.startswith("https://"):
        raise HTTPException(
            status_code=400,
            detail="A secure image URL is required."
        )

    save_setting(db, "hero_image", image_url)
    db.commit()

    return {"image_url": image_url, "message": "Hero image saved."}

@router.get("/social-feed")
def get_social_feed(db: Session = Depends(get_db)):
    settings = db.query(SiteSetting).filter(
        SiteSetting.key.in_(["instagram_url", "tiktok_url"])
    ).all()

    values = {setting.key: setting.value for setting in settings}

    return {
        "instagram_url": values.get("instagram_url"),
        "tiktok_url": values.get("tiktok_url"),
    }


@router.put("/social-feed")
def update_social_feed(
    data: SocialFeedSettings,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    instagram_url = validate_social_url(
        data.instagram_url,
        {"instagram.com", "www.instagram.com", "m.instagram.com"},
        "Instagram",
    )

    tiktok_url = validate_social_url(
        data.tiktok_url,
        {"tiktok.com", "www.tiktok.com", "vm.tiktok.com", "vt.tiktok.com"},
        "TikTok",
    )

    save_setting(db, "instagram_url", instagram_url)
    save_setting(db, "tiktok_url", tiktok_url)
    db.commit()

    return {
        "instagram_url": instagram_url,
        "tiktok_url": tiktok_url,
        "message": "Social feed links saved.",
    }

