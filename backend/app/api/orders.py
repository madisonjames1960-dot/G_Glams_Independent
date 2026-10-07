from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, Field
from app.db import get_db, Order
from app.security import decode_access_token
import json

router = APIRouter(prefix="/api/orders", tags=["Orders"])
bearer = HTTPBearer(auto_error=False)


class CreateOrderRequest(BaseModel):
    items: list
    total: float | None = None
    customer_name: str = Field(alias="customerName")
    phone: str | None = None
    email: EmailStr
    address: str | None = None
    payment_method: str | None = Field(default=None, alias="paymentMethod")
    status: str = "pending"

    class Config:
        populate_by_name = True


@router.post("")
def create_order(
    data: CreateOrderRequest,
    credentials: HTTPAuthorizationCredentials = Depends(bearer),
    db: Session = Depends(get_db),
):
    user_id = None

    if credentials:
        try:
            user_id = decode_access_token(credentials.credentials)
        except Exception:
            raise HTTPException(status_code=401, detail="Invalid or expired token.")

    order = Order(
        user_id=user_id,
        customer_name=data.customer_name,
        email=data.email,
        phone=data.phone,
        address=data.address,
        items=json.dumps(data.items),
        total=data.total or 0,
        status=data.status,
    )

    db.add(order)
    db.commit()
    db.refresh(order)

    return {
        "id": order.id,
        "customerName": order.customer_name,
        "email": order.email,
        "phone": order.phone,
        "address": order.address,
        "items": data.items,
        "total": order.total,
        "paymentMethod": data.payment_method,
        "status": order.status,
        "created_date": order.created_at.isoformat() if order.created_at else None,
    }
