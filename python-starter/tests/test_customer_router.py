import sys
import asyncio
if sys.platform.startswith("win"):
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import AsyncMock, patch
from fastapiproject.main import app

@pytest.fixture
def anyio_backend():
    return 'asyncio'

@pytest.fixture
def mock_db():
    mock_collection = AsyncMock()
    mock_collection.insert_one = AsyncMock(return_value=None)
    mock_collection.find = AsyncMock()
    mock_db = {"customers": mock_collection}
    return mock_db

@pytest.mark.anyio
@patch("fastapiproject.routers.customer_router.get_database")
async def test_create_customer(mock_get_db, mock_db):
    mock_get_db.return_value = mock_db
    customer_data = {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "address": "123 Main St",
        "phone": "123-456-7890"
    }
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/customers", json=customer_data)
    assert response.status_code == 201
    data = response.json()
    assert data["firstName"] == customer_data["firstName"]
    assert "_id" in data

@pytest.mark.anyio
@patch("fastapiproject.routers.customer_router.get_database")
async def test_get_all_customers(mock_get_db, mock_db):
    customers = [
        {"firstName": "Alice", "lastName": "Doe","email": "alice@example.com", "address": "123 Main St", "phone": "123-456-7890"},
        {"firstName": "Bob", "lastName": "Doe","email": "bob@example.com", "address": "123 Main St", "phone": "123-456-7890"}
    ]
    async def fake_find():
        for c in customers:
            yield c
    mock_db["customers"].find = fake_find
    mock_get_db.return_value = mock_db
    transport = ASGITransport(app=app)
    # Send GET request to retrieve all customers
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/customers")
    assert response.status_code == 200  # Expect HTTP 200 OK
    data = response.json()
    assert len(data) == 2  # Should return two customers
    assert data[0]["firstName"] == "Alice"  # Check first customer's name
    assert data[1]["firstName"] == "Bob"    # Check second customer's name

# Test for successful customer deletion via DELETE /customers/{id}
@pytest.mark.anyio
@patch("fastapiproject.routers.customer_router.get_database")
async def test_delete_customer_success(mock_get_db, mock_db):
    # Simulate successful deletion (deleted_count = 1)
    mock_result = AsyncMock()
    mock_result.deleted_count = 1
    mock_db["customers"].delete_one = AsyncMock(return_value=mock_result)
    mock_get_db.return_value = mock_db  # Patch DB connection
    transport = ASGITransport(app=app)
    # Send DELETE request for customer with id '1'
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.delete("/customers/507f1f77bcf86cd799439011")
    assert response.status_code == 204  # Expect HTTP 204 No Content

# Test for customer not found during deletion via DELETE /customers/{id}
@pytest.mark.anyio
@patch("fastapiproject.routers.customer_router.get_database")
async def test_delete_customer_not_found(mock_get_db, mock_db):
    # Simulate not found (deleted_count = 0)
    mock_result = AsyncMock()
    mock_result.deleted_count = 0
    mock_db["customers"].delete_one = AsyncMock(return_value=mock_result)
    mock_get_db.return_value = mock_db  # Patch DB connection
    transport = ASGITransport(app=app)
    # Send DELETE request for non-existent customer id '999'
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.delete("/customers/507f1f77bcf86cd799439011")
    assert response.status_code == 404  # Expect HTTP 404 Not Found
    assert response.json()["detail"] == "Customer not found"  # Check error message
