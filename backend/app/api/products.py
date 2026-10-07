from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db import get_db, Product
import json

router = APIRouter(prefix="/api/products", tags=["Products"])


def product_response(product):
    return {
        "id": product.id,
        "slug": product.slug,
        "name": product.name,
        "price": product.price,
        "image": product.image,
        "benefit": product.benefit,
        "description": product.description,
        "rating": product.rating,
        "reviewCount": product.review_count,
        "tags": json.loads(product.tags) if product.tags else [],
        "skinConcerns": json.loads(product.skin_concerns) if product.skin_concerns else [],
        "created_date": product.created_at.isoformat() if product.created_at else None,
    }


class ImageUpdate(BaseModel):
    image: str


@router.get("")
def list_products(
    sort: str | None = None,
    limit: int = 100,
    slug: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Product)

    if slug:
        query = query.filter(Product.slug == slug)

    query = query.order_by(Product.created_at.desc())

    return [
        product_response(product)
        for product in query.limit(limit).all()
    ]


@router.put("/{slug}/image")
def update_product_image(
    slug: str,
    data: ImageUpdate,
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.slug == slug).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")

    product.image = data.image
    db.commit()
    db.refresh(product)

    return product_response(product)


@router.get("/{slug}")
def get_product(slug: str, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.slug == slug).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")

    return product_response(product)
