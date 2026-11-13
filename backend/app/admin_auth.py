import os
import hmac
import jwt
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel

from app.security import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/api/admin", tags=["Admin"])
bearer = HTTPBearer(auto_error=False)


class AdminLoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def admin_login(data: AdminLoginRequest):
    expected_username = os.getenv("ADMIN_USERNAME")
    expected_password = os.getenv("ADMIN_PASSWORD")

    if not expected_username or not expected_password:
        raise HTTPException(status_code=503, detail="Admin login is not configured.")

    username_valid = hmac.compare_digest(
        data.username.encode("utf-8"),
        expected_username.encode("utf-8")
    )
    password_valid = hmac.compare_digest(
        data.password.encode("utf-8"),
        expected_password.encode("utf-8")
    )

    if not username_valid or not password_valid:
        raise HTTPException(status_code=401, detail="Invalid administrator credentials.")

    expires = datetime.now(timezone.utc) + timedelta(hours=8)
    token = jwt.encode(
        {"sub": expected_username, "role": "admin", "exp": expires},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {"access_token": token, "token_type": "bearer"}


def require_admin(
    credentials: HTTPAuthorizationCredentials = Depends(bearer)
):
    if not credentials:
        raise HTTPException(status_code=401, detail="Administrator login required.")

    try:
        payload = jwt.decode(
            credentials.credentials,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        if payload.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Administrator access required.")
        return payload
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid or expired administrator session.")
