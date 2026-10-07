from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db, Review

router = APIRouter(prefix="/api/reviews", tags=["Reviews"])


def review_response(review):
    return {
        "id": review.id,
        "product_id": review.product_id,
        "name": review.name,
        "rating": review.rating,
        "comment": review.comment,
        "created_date": review.created_at.isoformat() if review.created_at else None,
    }


@router.get("")
def list_reviews(
    limit: int = 100,
    db: Session = Depends(get_db),
):
    reviews = (
        db.query(Review)
        .order_by(Review.created_at.desc())
        .limit(limit)
        .all()
    )

    return [review_response(review) for review in reviews]
